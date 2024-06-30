import { AssetData } from "@/type/type";
import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Switch } from "@/components/ui/switch"




const GraddingMaintenanceCreate = () => {
    const [GraddingMachine, setGraddingMachine] = useState([])
    const [mc_name, setMc_name] = useState("")
    const Date = useRef<HTMLInputElement>(null)
    const [dustTable, setDustTable] = useState<boolean>(false)
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
                    <select className="w-2/4 flex h-8 rounded-md border border-input bg-background px-3  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setMc_name(e.target.value)}>
                        <option value="">Select Machine</option>
                        {GraddingMachine.map((item: AssetData) => (
                            <option key={item.id} value={item.machineName}>{item.machineName}</option>
                        ))}
                    </select>
                </div>

                <div className="flex">

                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Date Of Cleaning</Label>
                    <Input className="w-2/4 " placeholder="Date" ref={Date} type='date' />
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">DustTable Clean</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" checked={dustTable} onCheckedChange={(checked) => setDustTable(checked)} />
                        <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>
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
