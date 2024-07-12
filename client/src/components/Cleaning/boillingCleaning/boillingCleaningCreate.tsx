import { AssetData } from "@/type/type";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { FaCamera } from "react-icons/fa";
import BlobImageDisplay from "../ViewBlobimage";
import CameraComponentBroken from "../CameraComponentBroken";
import CameraComponentClean from '../CameraComponentClean';

const BoillingCleanCreate = () => {
    const [GraddingMachine, setGraddingMachine] = useState([]);
    const [mc_name, setMc_name] = useState("");
    const Date = useRef<HTMLInputElement>(null);
    const CleancameraRef = useRef<any>(null);
    const DamageCameraRef = useRef<any>(null);
    const [motorClean, setMotorClean] = useState<boolean>(false);
    const [insideWashBystream, setInsideWashByStream] = useState<boolean>(false);
    const [drainCleaning, setDrainCleaning] = useState<boolean>(false);
    const [waterChamberCleaning, setWatterChamberCleaning] = useState<boolean>(false);
    const [pressureGageClean, setPressureGageClean] = useState<boolean>(false);
    const [hopperClean, setHopperClean] = useState<boolean>(false);
    const [elevetorCup, setElevetorCup] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [damage, setDamage] = useState<boolean>(false);
    const [partsName, setPartsName] = useState<string>("");
    const [cleanningFiles, setCleaningFiles] = useState<Blob[]>([]);
    const [damageFiles, setDamageFiles] = useState<Blob[]>([]);
    const [cleanImageUrl, setCleanImageUrl] = useState<string[]>([])
    const [brokenImageUrl, setBrokenImageUrl] = useState<string[]>([])
    useEffect(() => {
        axios.get('/api/asset/getallmachineformaintenence/Boiling')
            .then(res => {
                console.log(res.data);
                setGraddingMachine(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const CreateurlFromblob = (blob: Blob[]) => {
        for (let i = 0; i < blob.length; i++) {
            const url = URL.createObjectURL(blob[i]);
            setCleanImageUrl([...cleanImageUrl, url]);
        }
    }
    const CreateurlFromBrokenblob = (blob: Blob[]) => {
        for (let i = 0; i < blob.length; i++) {
            const url = URL.createObjectURL(blob[i]);
            setBrokenImageUrl([...brokenImageUrl, url]);
        }
    }
    useEffect(() => {
        const totalSteps = 7;
        const completedSteps = [
            motorClean,
            insideWashBystream,
            drainCleaning,
            waterChamberCleaning,
            pressureGageClean,
            hopperClean,
            elevetorCup
        ].filter(Boolean).length;
        setProgress((completedSteps / totalSteps) * 100);
    }, [
        motorClean,
        insideWashBystream,
        drainCleaning,
        waterChamberCleaning,
        pressureGageClean,
        hopperClean,
        elevetorCup
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!cleanningFiles || cleanningFiles.length === 0) {
            console.log("submit called")
            return;
        }
        const formData = new FormData();
        formData.append('mc_name', mc_name);
        formData.append('date', Date.current!.value);
        formData.append('motorClean', motorClean.toString());
        formData.append('insideWashBystream', insideWashBystream.toString());
        formData.append('drainCleaning', drainCleaning.toString());
        formData.append('waterChamberCleaning', waterChamberCleaning.toString());
        formData.append('pressureGageClean', pressureGageClean.toString());
        formData.append('hopperClean', hopperClean.toString());
        formData.append('elevetorCup', elevetorCup.toString());
        formData.append('damage', damage.toString());
        formData.append('partsName', partsName);
        formData.append('percentage', progress.toString());
        for (let i = 0; i < cleanningFiles.length; i++) {
            formData.append('cleanedPartsImages', cleanningFiles[i]);
        }
        if (damage) {
            if (damageFiles && damageFiles.length > 0) {
                for (let i = 0; i < damageFiles.length; i++) {
                    formData.append("damagedPartsImages", damageFiles[i]);
                }
            }
        }
        axios.post('/api/cleaning/boillingcleancreate', formData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            });

    };
    const setCleaningImage = (photo: any) => {
        console.log(photo)
        let data: Blob[] = [];
        photo.toBlob((blob: Blob) => {
            data = [...(cleanningFiles), blob]
            setCleaningFiles(data);
            CreateurlFromblob(data)
        });
        (successdialog as any).close();
    }
    const setBrokenImage = (photo: any) => {
        let data: Blob[] = [];
        photo.toBlob((blob: Blob) => {
            data = [...damageFiles, blob]
            setDamageFiles(data);
            CreateurlFromBrokenblob(data)
        });
        (successdialogBroken as any).close();
    }
    const callChildGetVideoBroken = () => {
        (successdialogBroken as any).showModal()
        if (DamageCameraRef.current) {
            DamageCameraRef.current.getVIdeo();
        }
    }
    const callChildGetVideo = () => {
        (successdialog as any).showModal()
        if (CleancameraRef.current) {
            CleancameraRef.current.getVIdeo();  // Call getVideo function from CameraComponent
        }
    };
    const successdialog = document.getElementById('PhotodailogCleanBoilling') as HTMLInputElement;
    const successdialogBroken = document.getElementById('PhotodailogDamageBoilling') as HTMLInputElement;
    const closeDialogButton = document.getElementById('closeBoillingCleanVideo') as HTMLInputElement;
    const closeDialogButtonBroken = document.getElementById('closeBoilingDamageVideo') as HTMLInputElement;
    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialog != null) {
                (successdialog as any).close();
                CleancameraRef.current.stopVideo();
            }
        });
    }
    if (closeDialogButtonBroken) {
        closeDialogButtonBroken.addEventListener('click', () => {
            if (successdialogBroken != null) {
                (successdialogBroken as any).close();
                DamageCameraRef.current.stopVideo();
            }
        });
    }

    return (
        <div className="pl-5 pr-5">
            <Progress value={progress} max={100} className="mb-4" />
            <form className='flex flex-col gap-1 text-xs' onSubmit={handleSubmit}>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Cooker</Label>
                    <select className="w-2/4 flex h-8 rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setMc_name(e.target.value)} value={mc_name} required>
                        <option value="">Select Cooker</option>
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
                    <Label className="w-2/4 pt-1">MOTOR  AND OTHER PARTS CLEANING</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="dustTable" checked={motorClean} onCheckedChange={setMotorClean} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">COOKING INSIDE WASH BY STREAM</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="hopper" checked={insideWashBystream} onCheckedChange={setInsideWashByStream} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">DRAIN LINE CLEANING</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="elevetorCups" checked={drainCleaning} onCheckedChange={setDrainCleaning} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">WATER WASH CHAMBER CLEANING </Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="elevetorMotorCleanByAir" checked={waterChamberCleaning} onCheckedChange={setWatterChamberCleaning} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">PRESSURE GAGE CLEANING</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="McAllPartsClean" checked={pressureGageClean} onCheckedChange={setPressureGageClean} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">HOPPER</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="binClean" checked={hopperClean} onCheckedChange={setHopperClean} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">ELEVATOR CUP</Label>
                    <div className="flex items-center space-x-2">
                        <Switch id="CallibrationRollerHolesClean" checked={elevetorCup} onCheckedChange={setElevetorCup} />
                    </div>
                </div>
                <div className="flex mt-2">
                    <Label style={{ lineHeight: '5' }} className="w-1/8 pt-1 text-right text-gray-500 justify-center">Upload</Label>
                    <div className="flex ml-5 items-center space-x-2">
                        <Button className="bg-blue-500 text-center items-center justify-center h-7 w-15" type="button" onClick={callChildGetVideo}><FaCamera /></Button>
                        <div className="flex">
                            {
                                cleanImageUrl.map((url: string, index: number) => (
                                    <div key={index} >
                                        <img src={url} alt={`Blob ${index}`} style={{ width: '70px', height: '70px', margin: '5px' }} />

                                        <Button className="bg-red-500 text-center items-center justify-center h-7 w-12" type="button" onClick={() => {
                                            const data = cleanImageUrl.filter((url: string, i: number) => i !== index)
                                            setCleanImageUrl(data)
                                        }}>Clear</Button>
                                    </div>
                                ))
                            }
                        </div>



                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Check if any Parts is Damage </Label>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" checked={damage} onChange={(e) => setDamage(e.target.checked)} className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" required />
                    </div>
                </div>
                {
                    damage && (
                        <>
                            <div className="flex">
                                <Label className="w-2/4 pt-2">Name Of the Parts</Label>
                                <div className="flex items-center space-x-2">
                                    <Input className="w-100 text-center" placeholder="Name Of the Parts" value={partsName} onChange={(e) => setPartsName(e.target.value)} required={damage === true ? true : false} />
                                </div>
                            </div>
                            <div className="flex">
                                <Label style={{ lineHeight: '5' }} className="w-1/8 pt-1 text-right text-gray-500 justify-center">Upload</Label>
                                <div className="flex ml-5 items-center space-x-2">
                                    <Button className="bg-blue-500 text-center items-center text-center h-7 w-15" type="button" onClick={callChildGetVideoBroken}><FaCamera /></Button>
                                    <div className="flex">
                                        {
                                            brokenImageUrl.map((url: string, index: number) => (
                                                <div key={index} >
                                                    <img src={url} alt={`Blob ${index}`} style={{ width: '70px', height: '70px', margin: '5px' }} />

                                                    <Button className="bg-red-500 text-center items-center justify-center h-7 w-12" type="button" onClick={() => {
                                                        const data = brokenImageUrl.filter((item, i) => i !== index)
                                                        setBrokenImageUrl(data)
                                                    }}>Clear</Button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                <div>
                    <Button className="bg-orange-500 text-center items-center justify-center h-8 w-20">Submit</Button>
                </div>
            </form>
            <dialog id="PhotodailogCleanBoilling" className="dashboard-modal">
                <button id="closeBoillingCleanVideo" className="dashboard-modal-close-btn ">X </button>
                <span className="flex">
                    <CameraComponentClean onSave={(photo: any) => setCleaningImage(photo)} ref={CleancameraRef} />
                </span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
            <dialog id="PhotodailogDamageBoilling" className="dashboard-modal">
                <button id="closeBoilingDamageVideo" className="dashboard-modal-close-btn ">X </button>
                <span className="flex">

                    <CameraComponentBroken onSave={(photo: any) => setBrokenImage(photo)} ref={DamageCameraRef} />

                </span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </div>
    );
}

export default BoillingCleanCreate;
