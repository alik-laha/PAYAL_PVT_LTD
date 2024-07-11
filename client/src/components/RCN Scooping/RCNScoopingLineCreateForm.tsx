
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { ScoopData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useRef } from "react"

const RCNScoopingLineCreateForm = (props:any) => {
    console.log(props)
    const DateRef = useRef<HTMLInputElement>(null)
   
    return (
        <>
        <div className="px-5 py-5 overflow-auto">
            <form className='flex flex-col gap-1 pt-1' >
               <div className="mx-8 flex flex-col gap-1"> 
               <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div>
                <div className="flex"><Label className="w-2/4 pt-1">Date of Entry</Label>
                <Input className="w-2/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> </div>


                </div>
                   <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
           
            {/* noOfEmployees: string;
            noOfLadies: string;
            noOfGents: string;
            noOfSupervisors: string;
            noOfOperators: string; */}
  
                        <TableHead className="text-center" >Sl. No.</TableHead>
                       
                        <TableHead className="text-center" >Scooping Line</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Size Name</TableHead>
                        <TableHead className="text-center" >Opening Qty(Kg)</TableHead>
                        <TableHead className="text-center" >Receiving Qty (Kg)</TableHead>
                        <TableHead className="text-center" >Wholes</TableHead>
                        <TableHead className="text-center" >Broken</TableHead>
                        <TableHead className="text-center" >Uncut</TableHead>
                        <TableHead className="text-center" >Unscoop</TableHead>
                        <TableHead className="text-center" >Non Cut</TableHead>
                        <TableHead className="text-center" >Rejection</TableHead>
                        <TableHead className="text-center" >Dust</TableHead>
                        <TableHead className="text-center" >KOR</TableHead>
                        <TableHead className="text-center" >Trolley Broken(%)</TableHead>
                        <TableHead className="text-center" >Trolley Small JB(%)</TableHead>
                        <TableHead className="text-center" >Scooping On</TableHead>
                        <TableHead className="text-center" >Scooping Off</TableHead>
                        <TableHead className="text-center" >Breakdown Duration</TableHead>
                        <TableHead className="text-center" >Breakdown Reason</TableHead>
                        <TableHead className="text-center" >Other Duration</TableHead>
                        <TableHead className="text-center" >Transfered To</TableHead>
                       


                    </TableHeader>
                    <TableBody>
                        {props.scoop.length > 0 ? (
                            props.scoop.map((item: ScoopData, idx: number) => {

                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center">{item.Scooping_Line_Mc}</TableCell>
                                        <TableCell className="text-center">{item.origin}</TableCell>
                                        <TableCell className="text-center">{item.SizeName}</TableCell>
                                        <TableCell className="text-center">{item.Opening_Qty}</TableCell>
                                        <TableCell className="text-center">{item.Receiving_Qty}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        




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
                  {/* <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                      <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p>
                  </span> */}
  
  
              </dialog>
  
              <dialog id="erroremployeedialog" className="dashboard-modal">
                  <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                  {/* <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                      <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p>
                  </span> */}
  
  
              </dialog>
                  
              </div>
                          
    
  
                      
                     
  
  
            
          </>
    )
}
export default RCNScoopingLineCreateForm;
