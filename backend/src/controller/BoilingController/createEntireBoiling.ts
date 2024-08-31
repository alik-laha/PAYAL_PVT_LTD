import sequelize from "../../config/databaseConfig";
import { Request, Response } from "express";
import { lotNoData } from "../../type/type";
import LotNo from "../../model/lotNomodel";
import RcnBoiling from "../../model/RcnBoilingModel";
import RcnScooping from "../../model/scoopingModel";

const CreateBoilingEntire = async (req: Request, res: Response) => {

    const timeToMilliseconds = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    };
    // Helper function to convert milliseconds to "HH:MM"
    const millisecondsToTime = (milliseconds: number) => {
        const totalMinutes = Math.floor(milliseconds / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const CalculatemachineOnOffTime = (time1: string, time2: string) => {
        const time1InMilliseconds = timeToMilliseconds(time1) - timeToMilliseconds(time2);
        if (time1InMilliseconds < 0) {
            return timeToMilliseconds(time1) - timeToMilliseconds(time2) + 24 * 60 * 60 * 1000;
        }
        return time1InMilliseconds;
    }
    function processFormData(formDataArray: any[]): any[] {
        const ScoopingLineCount: { [key: string]: number } = {};
      
        // First pass: Count occurrences of each elementA
        formDataArray.forEach(formData => {
            ScoopingLineCount[formData.ScoopingLine] = (ScoopingLineCount[formData.ScoopingLine] || 0) + 1;
        });
      
        // Second pass: Modify elementB based on the count
        const seen: { [key: string]: number } = {};
      
        return formDataArray.map(formData => 
        {
          const count = ScoopingLineCount[formData.ScoopingLine];
          if (count > 1) {
            seen[formData.ScoopingLine] = (seen[formData.ScoopingLine] || 0) + 1;
            if (seen[formData.ScoopingLine] > 1) {
              formData.openQuantity = 0;
            }
          }
          return formData;
        });
      }


    try{
        const feeledBy = req.cookies.user;
        const formDataBoil=req.body.databoil
        const currentDate = new Date();
        const currentYear = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;

        // Get the latest sequence ID from the database
        const latestSequence: lotNoData | null = await LotNo.findOne({
            order: [['id', 'DESC']],
        }) as lotNoData | null;

        //let sequenceId = 0;
        let sequenceId = Number(process.env.START_LOTNO)
        if (latestSequence) {
            const latestYear = parseInt(latestSequence.lotNo.split('-')[0], 10);
            if (latestYear === currentYear) {
                sequenceId = parseInt(latestSequence.lotNo.split('-')[1], 10) + 1;
            }
        }
        // Generate the new sequence
        const newSequence = currentYear+'-'+sequenceId.toString().padStart(3, '0');
        
    
    await sequelize.transaction( async (transaction: any) =>{
        const lotGen=await LotNo.create({ lotNo: newSequence ,createdBy:feeledBy},{transaction})
        if(lotGen){
            for (let data of formDataBoil)
                {
                    if (!data.columnMC || !data.origin  || !data.size || !data.ScoopingLine || !data.sizeName ) {
                        res.status(500).json({ message: "All Fields Are Required" })
                        throw new Error ('Transaction Aborted 1')
                    }
                    const runtime=CalculatemachineOnOffTime(data.cookingOff, data.cookingOn) - (timeToMilliseconds(data.breakDown) + timeToMilliseconds(data.other))
                    if (runtime < 0) {    
                        res.status(500).json({ message: "Machine Run Time can not be negative" });
                        throw new Error ('Transaction Aborted 2')
                    }
                    const Mc_runTime = millisecondsToTime(runtime);    

                   await RcnBoiling.create({
                        LotNo: newSequence,
                        date: data.columnDate,
                        origin: data.origin,
                        SizeName: data.sizeName,
                        Size: data.size,
                        Scooping_Line_Mc: data.ScoopingLine,
                        Pressure: data.pressure,
                        CookingTime: data.CookingTime,
                        moisture:data.moisture,
                        MCName: data.columnMC,
                        Mc_on: data.cookingOn,
                        Mc_off: data.cookingOff,
                        noOfEmployees: data.columnEmployee,
                        Mc_breakdown: data.breakDown,
                        Mc_runTime: Mc_runTime,
                        otherTime: data.other,
                        CreatedBy: feeledBy
            
            
                    },{transaction});
                   
                }
                const processedFormDataArray = processFormData(updatedFormDataArray);
                const formData2 = processedFormDataArray.map(row => ({
                    
                    rcvQuantity: (parseFloat(row.size) * 80),
                     ...row
                }))
                for (let data2 of formData2) 
                    {
                        const scoopingnInitial = await RcnScooping.create({
                            Scooping_Line_Mc:data2.ScoopingLine,
                            Size:data2.size,
                            SizeName:data2.sizeName,
                            origin:data2.origin, 
                            LotNo:newSequence,
                            Opening_Qty:data2.openQuantity,
                            Receiving_Qty:data2.rcvQuantity
                
                        });
                        if(scoopingnInitial){
                            //res.status(200).json({ message: "Boiling Entry Made Successfully" });
                        }

                    }
           
        }


        
    })

    }
    catch{

    }

  
  
    
  
    // Save the new sequence to the database
    await LotNo.create({ lotNo: newSequence ,createdBy:feeledBy})
    //console.log('New sequence generated and saved:', newSequence);



}

export default CreateBoilingEntire;