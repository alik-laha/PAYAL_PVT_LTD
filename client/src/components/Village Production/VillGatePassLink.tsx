import {
    Table,
    TableBody,
    TableCell,
  
    TableRow,
} from "@/components/ui/table"
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
interface Props {
    id: number     
}
const VillageGateLink= (props:Props) => {
    const [lotview, setLotView] = useState("none")
    const [gateno, setGateNo] = useState<string>('')
    const [lotdata, setLotData] = useState<any[]>([])
    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;
    const [isdisable, setisdisable] = useState<boolean>(false)
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
    const [errortext, setErrortext] = useState('')

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        setisdisable(true)
       
        try {
            const initialhumid = await axios.post('/api/villageout/linkGatePass', {
                id: props.id,
                gatepassId:gateno
            })
            console.log(initialhumid)
            setErrortext(initialhumid.data.message)
            if (initialhumid.status === 200) {
                const dialog2 = document.getElementById("successemployeedialog") as HTMLDialogElement
                dialog2.showModal()
                setTimeout(() => {
                    dialog2.close()
                    window.location.reload()
                }, 3000)
            }

        }
        catch (err) {
            console.log(err)
            if (axios.isAxiosError(err)) {
                setErrortext(err.response?.data.message || 'An Unexpected Error Occured')
            }
            else {
                setErrortext('An Unexpected Error Occured')
            }
            const dialog = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialog.showModal()
            setTimeout(() => {
                dialog.close()
            }, 2000)
        }
        finally {
            setisdisable(false)
        }



    }
    const handleGateNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)
       e.preventDefault()
        setGateNo(e.target.value)
        if (e.target.value.length > 0 && lotdata.length > 0) {
            setLotView("block")
        } else {
            setLotView("none")
        }
        axios.post("/api/villageout/findAllGatePass/", { GateID: e.target.value })
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            setLotData(res.data.skuData)
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 404) {
                            setLotData([])
                        }
                    })
    }

    const handleGateIdClick = (item: any) => {
        setGateNo(item.gatePassNo)
        setLotData([]);
        setLotView("none");

    };
    return (
        <>
        <div className="px-5 py-2 ">
                <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit2}>
        <Table className="mt-4">
                    
                        <TableBody>
                            <TableRow>
                            <TableCell className="text-center font-semibold">Gatepass No</TableCell>
                            <TableCell className="text-center">

                            <Input className="justify-center items-center text-center" placeholder="GatePass No" value={gateno} onChange={(e)=>handleGateNoChange( e)} />
                                                      <ScrollArea className="h-30 w-30 " style={{ display: lotview }}>
                                                                             {
                                                                                 lotdata.map((item) => (
                                                                                     <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3"
                                                                                      onClick={() => handleGateIdClick(item)}>
                                                                                         <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.gatePassNo}</p>
                                                                                     </div>
                                                                                 ))
                                                                             }
                                                                         </ScrollArea>
                            </TableCell>

                            </TableRow>
                           
                          

                            </TableBody>
                        </Table>
                        <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable ? 'Submitting' : 'Submit'}</Button>
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
        
        
        
        </>)

}

export default VillageGateLink;