import { useEffect, useState } from "react";

interface QCWaterModifyProps {
    data: {
        id: number;
        date: string;
        Mc_on: string;
        feedph: string;
        feedtds: string;
        feedhardness: string;
        boilertype: string;
        ph: string;
        tds: string;
        day: string;
        night: string;
        wateruse: string;
        reading: string;
        remarks: string;
        CreatedBy: string;
        editStatus: string;
        modifiedBy:string;
    }
}

import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";

import { Button } from "../ui/button";
import {  QC_Boiler } from "../common/exportData";

import TimePicker from "../common/TimePicker";

const QCWaterModify = (props: QCWaterModifyProps) => {
  
    const [date, setdate] = useState<string>('')
    const [Mc_on, setMc_on] = useState<string>('')
    const [feedph, setfeedph] = useState<string>("")
    const [feedtds, setfeedtds] = useState<string>("")
    const [feedhardness, setfeedhardness] = useState<string>("")
    const [ph, setph] = useState<string>("")
    const [tds, settds] = useState<string>("")
    const [day, setday] = useState<string>("")
    const [night, setnight] = useState<string>("")
    const [wateruse, setwateruse] = useState<string>("")
    const [reading, setreading] = useState<string>("")
    
    const [boilertype, setboilertype] = useState<string>("")
    const [remarks, setremarks] = useState<string>("")

    const [errortext, setErrorText] = useState<string>("")
   
   

    useEffect(() => {
        console.log(props)
        setdate(props.data.date.slice(0, 10))
        setMc_on(props.data.Mc_on)
        setfeedph(props.data.feedph)
        setfeedtds(props.data.feedtds)
        setfeedhardness(props.data.feedhardness)
        setph(props.data.ph)
        settds(props.data.tds)
        setday(props.data.day)
        setnight(props.data.night)
        setwateruse(props.data.wateruse)
        setreading(props.data.reading)
    setboilertype(props.data.boilertype)
        setremarks(props.data.remarks)
      
      
  
    }, [])

 

    const [isdisable,setisdisable]=useState<boolean>(false)
    const successdialog = document.getElementById('rcneditscsDialog') as HTMLInputElement;
    const errordialog = document.getElementById('rcnediterrDialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('rcnscscloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('rcnerrorcloseDialog') as HTMLInputElement;


  
    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialog != null) {
                (successdialog as any).close();
                window.location.reload()
            }


        });
    }
    if (errorcloseDialogButton) {
        errorcloseDialogButton.addEventListener('click', () => {
            if (errordialog != null) {
                (errordialog as any).close();
            }

        });
    }
   


  

   
     
     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("submit")
        setisdisable(true)
        axios.post(`/api/qcWater/editQCWater/${props.data.id}`, { 
           date,Mc_on,feedph,feedtds,boilertype,feedhardness,ph,tds,day,night,wateruse,reading,remarks})
            .then((res) => {
                if (res.status === 201) {
                    (successdialog as any).showModal();
                }
            }
            )
            .catch((err) => {
                console.log(err)
                const errorText = err.response.data.message;
                setErrorText(errorText);
                (errordialog as any).showModal();
            }).finally(()=>{
                setisdisable(false)
            })

    }
    const handleonchangeon = (value:string) => {
        console.log(value)
        setMc_on(value)
        
    }

    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>
                <div className="flex mt-2"><Label className="w-2/4 mt-2">Date Of Testing</Label>
                 <Input className="w-2/4  text-center font-semibold justify-center" type='date' placeholder="Date" value={date} onChange={(e)=> setdate(e.target.value)} /> 
                 </div>
                 
              

                <div className="flex">
                    <Label className="w-2/4 mt-2">Testing Time</Label>

                    <TimePicker onChange={handleonchangeon} value={Mc_on}/>    
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Feed Water PH</Label>

                    <Input className="w-2/4  text-center " type='number' placeholder="PH" value={feedph} onChange={(e)=> setfeedph(e.target.value)} /> 

                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Feed Water TDS</Label>
                    <Input className="w-2/4  text-center " type='number' placeholder="TDS" value={feedtds} onChange={(e)=> setfeedtds(e.target.value)} /> 

                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Feed Water Hardness</Label>
                    <Input className="w-2/4  text-center " type='number' placeholder="Hardness" value={feedhardness} onChange={(e)=> setfeedhardness(e.target.value)} /> 

                    
                </div>
                <div className="flex"><Label className="w-2/4  mt-2">Boiler Type</Label>
                <select className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) =>  setboilertype(e.target.value)}
                                                    value={boilertype} required>
                                                    {/* <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Unit</option> */}
       
                                               {QC_Boiler.map((item) => (
                                                            <option key={item} value={item}>{item}</option>
                                                        ))} 
                                                    
                                                </select>
                       </div>
                   
                <div className="flex">
                    <Label className="w-2/4 mt-2">Boiler PH</Label>
                    <Input className="w-2/4  text-center " type='number' placeholder="PH" value={ph} onChange={(e)=> setph(e.target.value)} /> 
                </div>
                
                <div className="flex">
                    <Label className="w-2/4 mt-2">Boiler TDS</Label>
                    <Input className="w-2/4  text-center " type='number' placeholder="TDS" value={tds} onChange={(e)=> settds(e.target.value)} /> 
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Blown Down-Day Shift</Label>
                    <Input className="w-2/4  text-center "  placeholder="Day-Shift" value={day} onChange={(e)=> setday(e.target.value)} /> 
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Blown Down-Night Shift</Label>
                    <Input className="w-2/4  text-center "  placeholder="Night-Shift" value={night} onChange={(e)=> setnight(e.target.value)} /> 
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Water Reading</Label>
                  
                    <Input className="w-2/4  text-center " type='number' placeholder="Reading" value={reading} onChange={(e)=> setreading(e.target.value)} /> 
                </div>

                
                <div className="flex">
                    <Label className="w-2/4 mt-2">User Water</Label>
                    <Input className="w-2/4  text-center " type='number' placeholder="User Water" value={wateruse} onChange={(e)=> setwateruse(e.target.value)} /> 
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Remarks</Label>
                    <Input className="w-2/4  text-center "  placeholder="Remarks" value={remarks} onChange={(e)=> setremarks(e.target.value)} /> 
                </div>
               
                
               
               
                <Button className="bg-orange-500  mt-6 ml-20 mr-20 text-center items-center justify-center" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
            </form>

            <dialog id="rcneditscsDialog" className="dashboard-modal">
                <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Modification of QC Water Entry is Requested </p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="rcnediterrDialog" className="dashboard-modal">
                <button id="rcnerrorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>



        </div>
    )

}

export default QCWaterModify