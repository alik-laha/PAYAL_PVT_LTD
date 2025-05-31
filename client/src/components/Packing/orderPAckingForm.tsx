import { useEffect, useState } from "react";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const PackingCreateForm = (props: any) => {

     const [mfgDate, setMfgDate] = useState<string>('')
     const [noOfBags, setNoOfBags] = useState<string>("")
     const [noOfSystemBags, setNoOfSystemBags] = useState<number>(0)
     const [batchID, setBatchID] = useState<string>("")
     const [remarks, setRemarks] = useState<string>("")
     const [id, setId] = useState<string>("")
         const [isdisable,setisdisable]=useState<boolean>(false)
     const [orderpk, setOrderpk] = useState<string>("")
      const [errortext, setErrorText] = useState<string>("")
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
        e.preventDefault();
          setisdisable(true)
                axios.post(`/api/packing/createPacking/${id}`, { mfgDate, noOfBags, batchID, orderpk, noOfSystemBags,remarks,
                    orderID:props.data.orderID,origin:props.data.origin,gradeName:props.data.gradeName ,fulfillquantity:props.data.fulfillquantity})
                    .then((res) => {
                        console.log(res)
                        setErrorText(res.data.message)
                        if (successdialog != null) {
                            
                            (successdialog as any).showModal();
                        }
                    }).catch((err) => {
                        console.log(err)
                        console.log(err.response.data.error.original.errno)
                        if(err.response.data.error.original.errno && err.response.data.error.original.errno===1062){
                            setErrorText('Batch ID Already Exists')
                        }
                        else {
                            setErrorText(err.response.data.message)
                        }
                       
                        if (errordialog != null) {
                            (errordialog as any).showModal();
                        }
                    }).finally(()=>{
                        setisdisable(false)
                    })
      }

      useEffect(() => {
              // console.log(typeof (props.data.date))
              // console.log(props.data.date)
              setId(props.data.id)
              setOrderpk(props.data.orderpk)
          }, [])

          useEffect(() => {
            axios.put('/api/vendorSKU/getItembySectionGrade/Final Grade', { section: 'Packing' ,grade:props.data.gradeName})
                .then(res => {
                    console.log(res.data[0].unit)
                    if(res.data[0].unit){
                        setNoOfSystemBags(Number(props.data.fulfillquantity)/Number(res.data[0].unit))
                    }
                   
                    //setGrade(res.data)
                    //console.log(grade)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])

          return(
            <>
             <div className="pl-10 pr-10">
             <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>
             <div className="flex mt-2"><Label className="w-2/4 mt-2">Order ID</Label>
                 <Input className="w-2/4 bg-yellow-100 text-center font-semibold" placeholder="Order ID" value={props.data.orderID} readOnly /> </div>
                 {/* <div className="flex "><Label className="w-2/4 mt-2">Gate Pass Type</Label>
                 <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Gate Type" value={gatetype} readOnly /> </div> */}
                 <div className="flex"><Label className="w-2/4 mt-2" > Origin</Label>
                    <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Origin" value={props.data.origin} readOnly />
                </div>
                
                <div className="flex"><Label className="w-2/4 mt-2" > Opening Demand (Kg) </Label>
                    <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Truck No." value={props.data.fulfillquantity} readOnly />
                </div>
                <div className="flex"><Label className="w-2/4 mt-2" > Final Grade Name</Label>
                    <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Origin" value={props.data.gradeName} readOnly />
                </div>
                

                <div className="flex"><Label className="w-2/4 mt-2" > System Bag/Bucket Count</Label>
                    <Input className="w-2/4  text-center font-semibold bg-yellow-100" placeholder="Origin" value={noOfSystemBags.toFixed(2)} readOnly />
                </div>
                <div className="flex"><Label className="w-2/4 mt-2" >Manufacturing Date</Label>
                <Input className="w-2/4 text-center justify-center" placeholder="Mfg Date" value={mfgDate} onChange={(e) => setMfgDate(e.target.value)} type="date"/> </div>
             

 <div className="flex">
                    <Label className="w-2/4 mt-2">Physical Bucket/Bag Count</Label>
                    <Input className="w-2/4 text-center " placeholder="Bucket / Bag" type="number" value={noOfBags} onChange={(e) => setNoOfBags(e.target.value)} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Unique Batch No. </Label>
                    <Input className="w-2/4 text-center " placeholder="xxxx-yyyy-zzzz"  value={batchID} onChange={(e) => setBatchID(e.target.value)} />
                </div>

                <div className="flex">
                    <Label className="w-2/4 mt-2">Remarks </Label>
                    <Textarea className="w-2/4 text-center " placeholder="Remarks"  value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                </div>


                                <Button className="bg-orange-500 mb-1 mt-5 ml-20 mr-20 text-center items-center justify-center" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                
                </form>
                 <dialog id="rcneditscsDialog" className="dashboard-modal">
                                <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext} </p></span>
                
                                {/* <!-- Add more elements as needed --> */}
                            </dialog>
                
                            <dialog id="rcnediterrDialog" className="dashboard-modal">
                                <button id="rcnerrorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>
                
                                {/* <!-- Add more elements as needed --> */}
                            </dialog>
             </div>
            </>
          )
}

export default PackingCreateForm