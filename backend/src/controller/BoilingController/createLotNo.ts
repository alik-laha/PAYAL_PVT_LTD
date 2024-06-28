import { Request, Response } from "express";

import LotNo from "../../model/lotNomodel";
import { lotNoData } from "../../type/type";

const CreateLotNo = async (req: Request, res: Response) => {
try{

    //const { columnLotNo} = req.body.data;
      const feeledBy = req.cookies.user;

      const currentDate = new Date(`2025-03-31`);
      //console.log(currentDate);
      const currentYear = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
    
      // Get the latest sequence ID from the database
      const latestSequence: lotNoData | null = await LotNo.findOne({
        order: [['id', 'DESC']] ,
      }) as lotNoData | null;
    
      let sequenceId = 0;
    
      if (latestSequence) {
        const latestYear = parseInt(latestSequence.lotNo.split('-')[0], 10);
        if (latestYear === currentYear) {
          sequenceId = parseInt(latestSequence.lotNo.split('-')[1], 10) + 1;
        }
      }
    
      // Generate the new sequence
      const newSequence = currentYear+'-'+sequenceId.toString().padStart(3, '0');
    
      // Save the new sequence to the database
      await LotNo.create({ lotNo: newSequence ,createdBy:feeledBy})
      console.log('New sequence generated and saved:', newSequence);
      return res.status(201).json({ msg: `Lot No ${newSequence} is Created`, newSequence });
    
     

}
catch (err) {
    return res.status(500).json({ message: "Duplicate Lot No. or Error in Creating Lot No.", err });
}
}
export default CreateLotNo;