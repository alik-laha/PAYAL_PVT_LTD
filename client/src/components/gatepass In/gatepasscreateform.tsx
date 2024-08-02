import { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const GatePassCreateForm = () => {
    const vehicleNoRef = useRef<HTMLInputElement>(null)
    const DocumentNoRef = useRef<HTMLInputElement>(null)
    const DriverNameRef = useRef<HTMLInputElement>(null)
    const DriverContactNoref = useRef<HTMLInputElement>(null)
    const GrossWtRef = useRef<HTMLInputElement>(null)
    const GrossWtSlipRef = useRef<HTMLInputElement>(null)
    


const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const vehicle = vehicleNoRef.current?.value
        const document = DocumentNoRef.current?.value
        const drivername = DriverNameRef.current?.value
        const drivercontact = DriverContactNoref.current?.value
        const grossWt = GrossWtRef.current?.value
        const grossWtSlip = GrossWtSlipRef.current?.value
       
        
}



return(
<>

<div className="pl-5 pr-5 ">
            <form className='flex flex-col gap-1.5 text-xs' onSubmit={handleSubmit}>
            <div className="flex mt-3">

            </div>

                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Vehicle No</Label>
                    <Input className="w-2/4 text-center" placeholder="Vehicle No" ref={vehicleNoRef} required/>
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Chalan No(*)</Label>
                    <Input className="w-2/4 text-center" placeholder="Doc No." ref={DocumentNoRef} required/>
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Driver Name</Label>
                    <Input className="w-2/4 text-center" placeholder="Driver Name" ref={DriverNameRef} />
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Driver Contact</Label>
                    <Input className="w-2/4 text-center" placeholder="Contact No" ref={DriverContactNoref} />
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Gross Wt.</Label>
                    <Input className="w-2/4 text-center" placeholder="Gross Wt." ref={GrossWtRef} required/>
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Gross Wt. Slip </Label>
                    <Input className="w-2/4 text-center" placeholder="Slip No." ref={GrossWtSlipRef} />
                </div>
                <div>
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                </div></form>
</div>  

</>

)


}

export default GatePassCreateForm;