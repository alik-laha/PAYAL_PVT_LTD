import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-select"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { useState } from "react"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

const PackagingMetirialReceivingCreateForm = () => {
    const [unit, setUnit] = useState("")
    const [errText, setErrText] = useState("")
    const handleSubmit = () => {

    }

    return (
        <>
            <div className="pl-10 pr-10">
                <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

                    <div className="flex"><Label className="w-2/4  pt-1">Machine ID</Label>
                        <Input className="w-2/4 " placeholder="Machine Id" required /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Section</Label>
                        <Select value={unit} onValueChange={(value) => setUnit(value)} required={true}>
                            <SelectTrigger className="w-2/4">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>

                                    <SelectItem value="kg">
                                        KG
                                    </SelectItem>
                                    <SelectItem value="pcs">
                                        PCS
                                    </SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
                </form>


            </div>
            <dialog id="machinescs" className="dashboard-modal">
                <button id="machinescsbtn" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">New Asset has created Successfully</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="machineerror" className="dashboard-modal">
                <button id="machineerrorbtn" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errText}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )
}

export default PackagingMetirialReceivingCreateForm;