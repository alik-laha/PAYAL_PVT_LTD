import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from "@radix-ui/react-select";
import { AssetData } from "@/type/type";
import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'



const GraddingMaintenanceCreate = () => {
    const [GraddingMachine, setGraddingMachine] = useState([])
    const [mc_name, setMc_name] = useState("")
    const Date = useRef<HTMLInputElement>(null)
    // const [dustTable, setDustTable] = useState<string>("Not Clean")
    // const [hopper, setHopper] = useState<string>("Not Clean")
    // const [elevatorCups, setElevatorCups] = useState<string>("Not Clean")
    // const [elevatorMotorByAir, setElevatorMotorByAir] = useState<string>("Not Clean")
    // const [m_cAllPartsClean, setM_cAllPartsClean] = useState<string>("Not Clean")
    // const [binClean, setBinClean] = useState<string>("Not Clean")
    // const [callibrationRollerHoles, setCallibrationRollerHoles] = useState<string>("Not Clean")
    // const [CheckAnyPartDamage, setCheckAnyPartDamage] = useState<boolean>(false)

    useEffect(() => {
        axios.get('/api/asset/getMachineByType/Grading')
            .then(res => {
                console.log(res.data)
                setGraddingMachine(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSubmit = () => {
        console.log(mc_name)
    }
    return (
        <div className="pl-5 pr-5  ">
            <form className='flex flex-col gap-1 text-xs' onSubmit={handleSubmit}>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Machine Name</Label>
                    <Select value={mc_name} onValueChange={(value) => setMc_name(value)}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Machine" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    GraddingMachine.map((item: AssetData, indx) => {
                                        return (
                                            <SelectItem key={indx} value={item.machineName}>
                                                {item.machineName}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex">

                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Date Of Cleaning</Label>
                    <Input className="w-2/4 " placeholder="Date" ref={Date} type='date' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Other Duration(Total)</Label>
                    <Input className="w-2/4 " placeholder="Other Time" type='time' />
                </div>
                <div>
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                </div>

            </form>
        </div>
    );
}
export default GraddingMaintenanceCreate;
