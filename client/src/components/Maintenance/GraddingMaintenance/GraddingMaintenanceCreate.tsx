import { AssetData } from "@/type/type";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

const GraddingMaintenanceCreate = () => {
    const [GraddingMachine, setGraddingMachine] = useState([]);
    const [mc_name, setMc_name] = useState("");
    const Date = useRef<HTMLInputElement>(null);
    const [dustTable, setDustTable] = useState<boolean>(false);
    const [hopper, setHopper] = useState<boolean>(false);
    const [elevetorCups, setElevetorCups] = useState<boolean>(false);
    const [elevetorMotorCleanByAir, setElevetorMotorCleanByAir] = useState<boolean>(false);
    const [McAllPartsClean, setMcAllPartsClean] = useState<boolean>(false);
    const [binClean, setBinClean] = useState<boolean>(false);
    const [CallibrationRollerHolesClean, setCallibrationRollerHolesClean] = useState<boolean>(false);
    const [damage, setDamage] = useState<boolean>(false);
    const [partsName, setPartsName] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        axios.get('/api/asset/getMachineByType/Grading')
            .then(res => {
                console.log(res.data);
                setGraddingMachine(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const totalSteps = 7;
        const completedSteps = [
            dustTable,
            hopper,
            elevetorCups,
            elevetorMotorCleanByAir,
            McAllPartsClean,
            binClean,
            CallibrationRollerHolesClean
        ].filter(Boolean).length;
        setProgress((completedSteps / totalSteps) * 100);
    }, [
        dustTable,
        hopper,
        elevetorCups,
        elevetorMotorCleanByAir,
        McAllPartsClean,
        binClean,
        CallibrationRollerHolesClean
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(mc_name);
    };
    return (
        <div className="pl-5 pr-5">
            <Progress value={progress} max={100} className="mb-4" />
            <form className='flex flex-col gap-1 text-xs' onSubmit={handleSubmit}>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Machine Name</Label>
                    <select className="w-2/4 flex h-8 rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setMc_name(e.target.value)}>
                        <option value="">Select Machine</option>
                        {GraddingMachine.map((item: AssetData) => (
                            <option key={item.id} value={item.machineName}>{item.machineName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Date Of Cleaning</Label>
                    <Input className="w-2/4" placeholder="Date" ref={Date} type='date' />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">DustTable Clean</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="dustTable" checked={dustTable} onCheckedChange={setDustTable} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Hopper Clean</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="hopper" checked={hopper} onCheckedChange={setHopper} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Elevetor Cup Clean</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="elevetorCups" checked={elevetorCups} onCheckedChange={setElevetorCups} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Elevetor Motor Clean</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="elevetorMotorCleanByAir" checked={elevetorMotorCleanByAir} onCheckedChange={setElevetorMotorCleanByAir} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Mc all Parts Clean</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="McAllPartsClean" checked={McAllPartsClean} onCheckedChange={setMcAllPartsClean} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Bin Clean</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="binClean" checked={binClean} onCheckedChange={setBinClean} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Callibration Roller Holes Clean</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="CallibrationRollerHolesClean" checked={CallibrationRollerHolesClean} onCheckedChange={setCallibrationRollerHolesClean} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Cleaned Parts Image </Label>
                    <div className="flex items-center space-x-2">
                        <input type="file" />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Check if any Parts is Damage </Label>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" checked={damage} onChange={(e) => setDamage(e.target.checked)} className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                    </div>
                </div>
                <div className={damage === true ? "flex" : "hidden"}>
                    <Label className="w-2/4 pt-1">Name Of the Parts</Label>
                    <div className="flex items-center space-x-2">
                        <Input className="w-4/4" placeholder="Name Of the Parts" value={partsName} onChange={(e) => setPartsName(e.target.value)} />
                    </div>
                </div>
                <div className={damage === true ? "flex" : "hidden"}>
                    <Label className="w-2/4 pt-1">Damaged Parts Image upload</Label>
                    <div className="flex items-center space-x-2">
                        <input type="file" />
                    </div>
                </div>
                <div>
                    <Button className="bg-orange-500 text-center items-center justify-center h-8 w-20">Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default GraddingMaintenanceCreate;
