import { AssetData } from "@/type/type";
import axios from "axios";
import { useState, useEffect, useRef, FormEvent } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import CameraComponent from '../CameraComponent';
import { FaCamera } from "react-icons/fa";

const GraddingMaintenanceCreate = () => {
    const [GraddingMachine, setGraddingMachine] = useState<AssetData[]>([]);
    const [mc_name, setMc_name] = useState<string>("");
    const Date = useRef<HTMLInputElement>(null);
    const cameraRef = useRef<any>(null);
    const [dustTable, setDustTable] = useState<boolean>(false);
    const [hopper, setHopper] = useState<boolean>(false);
    const [elevetorCups, setElevetorCups] = useState<boolean>(false);
    const [elevetorMotorCleanByAir, setElevetorMotorCleanByAir] = useState<boolean>(false);
    const [McAllPartsClean, setMcAllPartsClean] = useState<boolean>(false);
    const [binClean, setBinClean] = useState<boolean>(false);
    const [CallibrationRollerHolesClean, setCallibrationRollerHolesClean] = useState<boolean>(false);
    const [damage, setDamage] = useState<boolean>(false);
    const [partsName, setPartsName] = useState<string>("");
    const [cleanningFiles, setCleaningFiles] = useState<Blob[]>([]);
    const [damageFiles, setDamageFiles] = useState<Blob[]>([]);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        axios.get('/api/asset/getMachineByType/Grading')
            .then(res => {
                setGraddingMachine(res.data);
            })
            .catch(err => {
                console.error(err);
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!cleanningFiles || cleanningFiles.length === 0) {
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < cleanningFiles.length; i++) {
            formData.append("cleanedPartsImages", cleanningFiles[i]);
        }
        if (damage) {
            if (damageFiles && damageFiles.length > 0) {
                for (let i = 0; i < damageFiles.length; i++) {
                    formData.append("damagedPartsImages", damageFiles[i]);
                }
            }
        }
        formData.append("mc_name", mc_name);
        formData.append("date", Date.current?.value || "");
        formData.append("dustTable", dustTable.toString());
        formData.append("hopper", hopper.toString());
        formData.append("elevetorCups", elevetorCups.toString());
        formData.append("elevetorMotorCleanByAir", elevetorMotorCleanByAir.toString());
        formData.append("McAllPartsClean", McAllPartsClean.toString());
        formData.append("binClean", binClean.toString());
        formData.append("CallibrationRollerHolesClean", CallibrationRollerHolesClean.toString());
        formData.append("damage", damage.toString());
        formData.append("partsName", partsName);
        formData.append("percentage", progress.toString());

        axios.post("/api/cleaning/graddingcleancreate", formData)
            .then((res) => {
                console.log("Files uploaded successfully", res);
                alert("Notice has been Uploaded Successfully");
            })
            .catch(err => {
                console.error(err);
            });
    };
    const setCleaningImage = (photo: any) => {
        photo.toBlob((blob: Blob) => {
            setCleaningFiles([...cleanningFiles, blob]);
        });

    }
    const callChildGetVideo = () => {
        if (cameraRef.current) {
            cameraRef.current.getVideo();  // Call getVideo function from CameraComponent
        }
    };


    return (
        <div className="pl-5 pr-5">
            <Progress value={progress} max={100} className="mb-4" />
            <form className='flex flex-col gap-1 text-xs' onSubmit={handleSubmit}>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Machine Name</Label>
                    <select className="w-2/4 flex h-8 rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setMc_name(e.target.value)} value={mc_name} required>
                        <option value="">Select Machine</option>
                        {GraddingMachine.map((item: AssetData) => (
                            <option key={item.id} value={item.machineName}>{item.machineName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Date Of Cleaning</Label>
                    <Input className="w-2/4" placeholder="Date" ref={Date} type='date' required />
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
                    {elevetorCups ? <Button className="bg-orange-500 text-center items-center justify-center h-8 w-20" type="button" onClick={callChildGetVideo}><FaCamera /></Button> : null}
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Elevetor Motor Clean</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="elevetorMotorCleanByAir" checked={elevetorMotorCleanByAir} onCheckedChange={setElevetorMotorCleanByAir} />
                    </div>
                    {elevetorMotorCleanByAir ? <Button className="bg-orange-500 text-center items-center justify-center h-8 w-20" type="button" onClick={callChildGetVideo}><FaCamera /></Button> : null}
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
                    {CallibrationRollerHolesClean ? <Button className="bg-orange-500 text-center items-center justify-center h-8 w-20" type="button" onClick={callChildGetVideo}><FaCamera /></Button> : null}
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Check if any Parts is Damage </Label>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" checked={damage} onChange={(e) => setDamage(e.target.checked)} className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                    </div>
                </div>
                {damage && (
                    <>
                        <div className="flex">
                            <Label className="w-2/4 pt-1">Name Of the Parts</Label>
                            <div className="flex items-center space-x-2">
                                <Input className="w-4/4" placeholder="Name Of the Parts" value={partsName} onChange={(e) => setPartsName(e.target.value)} required={damage === true ? true : false} />
                            </div>
                        </div>
                    </>
                )}
                <div>
                    <Button className="bg-orange-500 text-center items-center justify-center h-8 w-20">Submit</Button>
                </div>
            </form>
            <CameraComponent onSave={(photo: any) => setCleaningImage(photo)} ref={cameraRef} />
        </div>
    );
}

export default GraddingMaintenanceCreate;
