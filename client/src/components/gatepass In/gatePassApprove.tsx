
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

interface GatePassDataProps{

    data:{
        id: number;
            gatePassNo: string;
            type:string;
            date: string;
            time: string;
            grosswt: string;
            DocNo: string;
            grosswtNo: string;
            vehicleNo: string;
            driverName: string;
            driverContact: string;
            securityName: string;
            section: string;
            receivingStatus: number;
            netWeight: string;
            approvalStatus: number;
            billAmount: string;
            createdBy: string;
            status: string;
            modifiedBy: string;
    }
}

const GatepassApprove = (props: GatePassDataProps) => {
    //const [gatepassdetail, setgatepassdetail] = useState<GatePassData>()

    const [vehile,setVehicle]=useState<string>('')
    const [DocumentNo,setDocumentNo]=useState<string>('')
    const [DriverName,setDriverName]=useState<string>('')
    const [DriverContactNo,setDriverContactNo]=useState<string>('')
    const [GrossWt,setGrossWt]=useState<string>('')
    const [GrossWtSlip,setGrossWtSlip]=useState<string>('')
   
    const [ntweight,setNetWeight]=useState<string>('')
    const [section,setsection]=useState<string>('')
    const [billamt,setbillamt]=useState<number>()
    const [date,setDate]=useState<string>('')
    const [time,setTime]=useState<string>('')
    const [type,setType]=useState<string>('')

    const [gatepassEditMode, setgatepassEditMode] = useState(false)
    const [errortext, setErrorText] = useState<string>("")

    const successdialog = document.getElementById('machinescs') as HTMLInputElement;
    const errordialog = document.getElementById('machineerror') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('machinescsbtn') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('machineerrorbtn') as HTMLInputElement;
    
    if(closeDialogButton){
        closeDialogButton.addEventListener('click', () => {
            if(successdialog!=null){
                (successdialog as any).close();
                window.location.reload()
            }
            
            
          });
    }
    if(errorcloseDialogButton){
        errorcloseDialogButton.addEventListener('click', () => {
            if(errordialog!=null){
                (errordialog as any).close();
               
            }
            
          });
    }

    useEffect(() => {
      
        setType(props.data?.type || "")
        setVehicle(props.data?.vehicleNo || "")
        setDocumentNo(props.data?.DocNo|| "")
        setDriverName(props.data?.driverName || "")
        setDriverContactNo(props.data?.driverContact || "")
        setGrossWt(props.data?.grosswt|| "")
        setGrossWtSlip(props.data?.grosswtNo|| "")
    
        setDate(props.data?.date.slice(0,10) || "")
        setTime(props.data?.time || "")
        setNetWeight(props.data?.netWeight|| "")
        setsection(props.data?.section|| "")
    }, [props.data])

const handlegateEdit = () => {
        setgatepassEditMode(true)
    }
return (

<div className="pl-5 pr-5 ">

            <form className='flex flex-col gap-1 text-xs ' > 
                                                 
            <div className="mx-8 flex flex-col gap-0.5">  
      
            <div className="flex mt-1">
                <Label className="w-2/4 pt-1 ">Type (IN/OUT)</Label>
               <Input className="w-2/4 text-center bg-yellow-100" placeholder="type" value={type}  required/>
               
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Setion</Label>
                  
                  
                    <Input className="w-2/4 text-center bg-yellow-100" placeholder="Setion" value={section}  required/>
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Date</Label>
                    
                    {gatepassEditMode ? <Input className="w-2/4 text-center justify-center" type="date" placeholder="Vehicle No" value={date} onChange={(e) => setDate(e.target.value)} required/>
                    :<Input className="w-2/4 text-center bg-yellow-100 justify-center" type="date" placeholder="Vehicle No" value={date}  required/>}
                </div>
                
                  
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1 ">Time</Label>
                   
                    {gatepassEditMode ? <Input className="w-2/4 text-center justify-center" type='time' placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} required/>
                    :<Input className="w-2/4 text-center bg-yellow-100 justify-center" placeholder="Time" type='time' value={time}  required/>}
                
                </div> 
               
                                                  
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Vehicle No</Label>
                  
                    {gatepassEditMode ? <Input className="w-2/4 text-center" placeholder="Vehicle No" value={vehile} onChange={(e) => setVehicle(e.target.value)} required/>
                    :<Input className="w-2/4 text-center bg-yellow-100" placeholder="Vehicle No" value={vehile}  required/>}
                </div>
                
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Chalan No</Label>
                    
                    {gatepassEditMode ? <Input className="w-2/4 text-center" placeholder="Doc No." value={DocumentNo} onChange={(e) => setDocumentNo(e.target.value)} required/>
                    :<Input className="w-2/4 text-center bg-yellow-100" placeholder="Doc No." value={DocumentNo}  required/>}
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Driver Name</Label>
                    {gatepassEditMode ? <Input className="w-2/4 text-center" placeholder="Driver Name" value={DriverName} onChange={(e) => setDriverName(e.target.value)} required/>
                    :<Input className="w-2/4 text-center bg-yellow-100" placeholder="Driver Name" value={DriverName}  required/>}
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Driver Contact</Label>
                  
                    {gatepassEditMode ? <Input className="w-2/4 text-center" placeholder="Contact No" value={DriverContactNo} onChange={(e) => setDriverContactNo(e.target.value)} required/>
                    :<Input className="w-2/4 text-center bg-yellow-100" placeholder="Contact No" value={DriverContactNo}  required/>}
                </div>
                
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Gross Wt. (Kg)</Label>
                  
                    {gatepassEditMode ? <Input className="w-2/4 text-center" placeholder="Gross Wt." value={GrossWt} onChange={(e) => setGrossWt(e.target.value)} required/>
                    :<Input className="w-2/4 text-center bg-yellow-100" placeholder="Gross Wt." value={GrossWt}  required/>}
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Gross Wt. Slip </Label>
                  
                    {gatepassEditMode ? <Input className="w-2/4 text-center" placeholder="Slip No." value={GrossWtSlip} onChange={(e) => setGrossWtSlip(e.target.value)} required/>
                    :<Input className="w-2/4 text-center bg-yellow-100" placeholder="Slip No." value={GrossWtSlip}  required/>}
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Net Wt. (Kg)</Label>
                    {gatepassEditMode ? <Input className="w-2/4 text-center" placeholder="Net Weight" value={ntweight} onChange={(e) => setNetWeight(e.target.value)} required/>
                    :<Input className="w-2/4 text-center bg-yellow-100" placeholder="Net Weight" value={ntweight}  required/>}
                </div> 

                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1 font-bold">Bill Amount</Label>
                  <Input className="w-2/4 text-center" placeholder="Bill Amount" value={billamt} onChange={(e) => setbillamt(parseFloat(e.target.value))} required/>
                   
                </div>                    
                </div>
                <div className="flex mt-1">
                {gatepassEditMode ? <Button className='bg-red-500 mt-3 text-xs text-center items-center justify-center h-8 w-20' onClick={() => {
                                                        setVehicle(props.data?.vehicleNo || "")
                                                        setDocumentNo(props.data?.DocNo|| "")
                                                        setDriverName(props.data?.driverName || "")
                                                        setDriverContactNo(props.data?.driverContact || "")
                                                        setGrossWt(props.data?.grosswt|| "")
                                                        setGrossWtSlip(props.data?.grosswtNo|| "")
                                                        
                                                        setDate(props.data?.date.slice(0,10) || "")
                                                        setTime(props.data?.time || "")
                                                        setNetWeight(props.data?.netWeight|| "")
                                                        
                                                        setgatepassEditMode(false)
                                                    }}>Cancel Edit</Button> : null}  

                 {gatepassEditMode ? null : <Button className='bg-teal-500 mt-3 text-xs text-center items-center justify-center h-8 w-20' onClick={handlegateEdit}>Edit</Button>}     
                <Button className="bg-orange-500 ml-3 text-center items-center mt-3 text-xs justify-center h-8 w-20">Submit</Button>  
                </div>
                                        
                </form>
                <dialog id="machinescs" className="dashboard-modal">
        <button id="machinescsbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={tick} height={2} width={35} alt='tick_image'/>
        <p id="modal-text" className="pl-3 mt-1 font-medium">Profile Details Updated Successfully</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>

    <dialog id="machineerror" className="dashboard-modal">
        <button id="machineerrorbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={cross} height={25} width={25} alt='error_image'/>
        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>
                </div>






)

}
export default GatepassApprove;