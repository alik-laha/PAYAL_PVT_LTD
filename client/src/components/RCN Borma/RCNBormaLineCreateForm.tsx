
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

interface Props {
    borma: BormaData[]       
}


interface BormaRowData{
    id: number;
            LotNo: string;
            
            origin: string;
            InputWholes: string;
            InputPieces: string;
            TotalInput: string;
            Mc_on: string;
            Mc_off: string;
            Mc_breakdown: string;
           
           
            otherTime: string;
            NoOfTrolley: string;
            InputMoisture: string;
            OutputMoisture: string;
            OutputWholes: string;
            OutputPieces: string;
            TotalOutput: string;
            BormaLoss: string;
            Temp:string;
}


import { BormaData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";
import FormRow from "../common/FormRowTime";


const RCNBormaLineCreateForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const operatorRef = useRef<HTMLInputElement>(null);
    const [rows,setRows]=useState<BormaRowData[]>([])
   


    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialog != null) {
                (successdialog as any).close();
                window.location.reload();
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
   
   
    


    useEffect(() => { 
        const initialform =  props.borma.map((item: BormaData) => ({
          

            id: item.id,
            LotNo: item.LotNo,
           
            origin: item.origin,
            InputWholes: item.InputWholes,
            InputPieces: item.InputPieces,
            TotalInput: item.TotalInput,
            Mc_on: '00:00',
            Mc_off: '00:00',
            Mc_breakdown: '00:00',
         
            
            otherTime: '00:00',
            NoOfTrolley: '',
            InputMoisture: '',
            OutputMoisture: '',
            OutputWholes: '',
            OutputPieces: '',
            TotalOutput: '',
            BormaLoss: '',
            Temp:''



        }));
      
        //console.log(initialform)
        setRows(initialform)
        //console.log(rows)
    }, [props.borma]);


    
    const [errortext, setErrortext] = useState('')


    

    const handleRowChange = (index:number,field:string,fieldvalue:string|number) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
        //console.log(rows)
    }

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        props.borma.map((item: BormaData, idx: number) => {
            rows[idx].id=item.id
        })
        console.log(rows)
        const date = DateRef.current?.value  
        const operator=operatorRef.current?.value

        try 
        {
            const formData = rows.map((row: any) => ({
                Date: date,
                noOfOperators:operator,
                 ...row
            }))
            try{
                let bormacount = 0
                for (var data of formData) 
                    {
                        const createBorma= await axios.put(`/api/borma/createBorma/${data.id}`, { data })
                        bormacount++;
                        if (formData.length === bormacount) 
                        {
                            if (createBorma.status === 200) 
                            {
                                await axios.post('/api/scooping/updateLotNo', { lotNo:props.borma[0].LotNo,desc:'Borma'}) 
                            }
                        }
                    }

            }
            catch (err) {
                console.log(err)

                if(axios.isAxiosError(err)){
                    setErrortext(err.response?.data.message ||'An Unexpected Error Occured')
                }
                else{
                    setErrortext('An Unexpected Error Occured')
                }
                // const dialog = document.getElementById("erroremployeedialog") as HTMLDialogElement
                // dialog.showModal()
                // setTimeout(() => {
                //     dialog.close()
                // }, 2000)
                // await axios.post('/api/scooping/deleteScoopReportByLotNo',{ lotNo:props.borma[0].LotNo})
                }
           
            let scoopingallcount=0

                const resStatus=await axios.post('/api/boiling/getStatusBoiling', { lotNo:props.borma[0].LotNo})
                console.log(resStatus)

                if(resStatus.data.lotStatus.modifiedBy && resStatus.data.lotStatus.modifiedBy==='Borma')
                {
                   
                    for (var data2 of rows) 
                    {   
                        const resp=await axios.post('/api/scooping/createScoopingall', { data2 })
                        console.log(resp.data.scoop.id)
                        let p_id=await resp.data.scoop.id
                        await axios.post('/api/scooping/createInitialBorma', {p_id, data2 })
                        if (rows.length === scoopingallcount) 
                            {
                                
                                setErrortext('Scooping Entry Created Successfully')
                                if (resp.status === 200) 
                                {
                                    const dialog2 = document.getElementById("successemployeedialog") as HTMLDialogElement
                            dialog2.showModal()
                             setTimeout(() => {
                                 dialog2.close()
                                 window.location.reload()
                             }, 3000)
                                }
                            }
                    }
    
                    
                }          
        }
        catch (err) {
        console.log(err)
        if(axios.isAxiosError(err)){
            setErrortext(err.response?.data.message ||'An Unexpected Error Occured')
        }
        else{
            setErrortext('An Unexpected Error Occured')
        }
        const dialog = document.getElementById("erroremployeedialog") as HTMLDialogElement
        dialog.showModal()
        setTimeout(() => {
            dialog.close()
        }, 2000)
        }
    }

 
    return (
        <>
        <div className="px-5 py-2 overflow-auto">
            <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit}>
               <div className="mx-8 flex flex-col gap-0.5"> 
               {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                <div className="flex"><Label className="w-2/4 pt-1">Date of Entry</Label>
                <Input className="w-2/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> </div>
                <div className="flex"><Label className="w-2/4 pt-1">No. of Operator</Label>
                    <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> </div>
                   
                </div>
                   <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >LotNo</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Input Moisture</TableHead>
                        <TableHead className="text-center" >Output Moisture</TableHead>
                        <TableHead className="text-center" >Output Wholes</TableHead>
                        <TableHead className="text-center" >Output Pieces</TableHead>
                        <TableHead className="text-center" >No Of Trolley</TableHead>
                        <TableHead className="text-center" >Temp</TableHead>
                        <TableHead className="text-center" >Borma On</TableHead>
                        <TableHead className="text-center" >Borma Off</TableHead>
                        <TableHead className="text-center" >Breakdown Duration</TableHead>
                        <TableHead className="text-center" >Other Duration</TableHead>
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:BormaRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                        <TableCell className="text-center "> <Input  value={row.InputMoisture} placeholder="%" onChange={(e) => handleRowChange(idx,'InputMoisture',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.OutputMoisture} placeholder="%" onChange={(e) => handleRowChange(idx,'OutputMoisture',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.OutputWholes} placeholder="Wholes" onChange={(e) => handleRowChange(idx,'OutputWholes',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.OutputPieces} placeholder="Pieces" onChange={(e) => handleRowChange(idx,'OutputPieces',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.NoOfTrolley} placeholder="No." onChange={(e) => handleRowChange(idx,'NoOfTrolley',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Temp} placeholder="Degree" onChange={(e) => handleRowChange(idx,'Temp',e.target.value)} required /></TableCell>
                                        {/* <TableCell className="text-center "> <Input className="bg-green-100"  value={row.Mc_on} placeholder="MC ON Time" onChange={(e) => handleRowChange(idx,'Mc_on',e.target.value)} type='time' required /></TableCell> */}
                                        <FormRow idx={idx} row={row} column='Mc_on' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off' handleRowChange={handleRowChange}/>
                                        {/* <TableCell className="text-center"><Input className="bg-red-100" value={row.Mc_off} placeholder="MC Off Time" onChange={(e) => handleRowChange(idx,'Mc_off',e.target.value)} type='time' required /></TableCell> */}
                                        <TableCell className="text-center"><Input  value={row.Mc_breakdown} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.otherTime} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime',e.target.value)} type='time'  /></TableCell>
                                 
                                    </TableRow>
                                );
                            })
                        ) : null}
                    </TableBody>
                </Table>  
                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                  
                   
                  </form>
                  <dialog id="successemployeedialog" className="dashboard-modal">
                  <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                  <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                      <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p>
                  </span>
  
  
              </dialog>
  
              <dialog id="erroremployeedialog" className="dashboard-modal">
                  <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                  <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                      <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p>
                  </span>
  
  
              </dialog>
                  
              </div>
                          
    
  
                      
                     
  
  
            
          </>
    )
}
export default RCNBormaLineCreateForm;
