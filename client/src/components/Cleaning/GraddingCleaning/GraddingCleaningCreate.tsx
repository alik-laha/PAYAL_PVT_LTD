import { AssetData } from "@/type/type";
import axios from "axios";
import { useState, useEffect, useRef, FormEvent } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import CameraComponentClean from '../CameraComponentClean';
import { FaCamera } from "react-icons/fa";
import BlobImageDisplay from "../ViewBlobimage";
import CameraComponentBroken from "../CameraComponentBroken";

const GraddingMaintenanceCreate = () => {
    const [GraddingMachine, setGraddingMachine] = useState<AssetData[]>([]);
    const [mc_name, setMc_name] = useState<string>("");
    const Date = useRef<HTMLInputElement>(null);
    const CleancameraRef = useRef<any>(null);
    const DamageCameraRef = useRef<any>(null);
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
    const [cleanImageUrl, setCleanImageUrl] = useState<string[]>([])
    const [brokenImageUrl, setBrokenImageUrl] = useState<string[]>([])
    const [colorprogress,setColorProgress]=useState<string>('')

    useEffect(() => {
        axios.get('/api/asset/getMachineByType/Grading')
            .then(res => {
                setGraddingMachine(res.data);
            })
            .catch(err => {
                console.error(err);
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
            dustTable,
            hopper,
            elevetorCups,
            elevetorMotorCleanByAir,
            McAllPartsClean,
            binClean,
            CallibrationRollerHolesClean
        ].filter(Boolean).length;
        setProgress((completedSteps / totalSteps) * 100);
        if(progress<=20){
            setColorProgress('Worst')
        }
        if(progress>20 && progress <=40){
            setColorProgress('Bad')
        }
        if(progress>40 && progress <=60){
            setColorProgress('Nominal')
        }
        if(progress>60 && progress <=80){
            setColorProgress('Better')
        }
        if(progress>80){
            setColorProgress('Best')
        }
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
        let data: Blob[] = [];
        photo.toBlob((blob: Blob) => {
            data = [...cleanningFiles, blob]
            setCleaningFiles(data);
            CreateurlFromblob(data)
        });
    }
    const setBrokenImage = (photo: any) => {
        let data: Blob[] = [];
        photo.toBlob((blob: Blob) => {
            data = [...damageFiles, blob]
            setDamageFiles(data);
            CreateurlFromBrokenblob(data)
        });
    }
   
    const successdialogclean = document.getElementById('Photodailogclean') as HTMLInputElement;
    const successdialogcleandamage = document.getElementById('Photodailogcleandamage') as HTMLInputElement;
    const closeDialogButton = document.getElementById('closePhotoclean') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('closePhotodamage') as HTMLInputElement;

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialogclean != null) {
                (successdialogclean as any).close();
                //window.location.reload();
            }


        });
    }
    if (errorcloseDialogButton) {
        errorcloseDialogButton.addEventListener('click', () => {
            if (errorcloseDialogButton != null) {
                (errorcloseDialogButton as any).close();
            }

        });
    }
    const callChildGetVideo = () => {
        (successdialogclean as any).showModal()
        if (CleancameraRef.current) {
            CleancameraRef.current.getVIdeo();  // Call getVideo function from CameraComponent
        }
    };

    const callChildGetVideoBroken = () => {
        (successdialogcleandamage as any).showModal()
        if (DamageCameraRef.current) {
            DamageCameraRef.current.getVIdeo();  // Call getVideo function from CameraComponent
        }
    }




    return (
        <div className="pl-5 pr-5">
            <div className="flex">
            <Progress value={progress} max={100} className="mb-4 mt-1 w-3/4" />
            <span className="w-1/4 text-center font-semibold text-violet-700">{colorprogress}</span> 
            </div>
            
            <form className='flex flex-col gap-1 text-xs' onSubmit={handleSubmit}>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Machine Name</Label>
                    <select className="w-2/4 text-center flex h-8 rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setMc_name(e.target.value)} value={mc_name} required>
                        <option value="">Select Machine</option>
                        {GraddingMachine.map((item: AssetData) => (
                            <option key={item.id} value={item.machineName}>{item.machineName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Date Of Cleaning</Label>
                    <Input className="w-2/4 justify-center" placeholder="Date" ref={Date} type='date' required />
                </div>
                <div className="flex mt-2">
                    <Label className="w-2/4 pt-1">1. DustTable Clean</Label>
                    <div className="flex ml-20 items-center space-x-2">
                       <Switch id="dustTable"  checked={dustTable} onCheckedChange={setDustTable} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">2. Hopper Clean</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="hopper" checked={hopper} onCheckedChange={setHopper} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">3. Elevetor Cup Clean</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="elevetorCups" checked={elevetorCups} onCheckedChange={setElevetorCups} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">4. Elevetor Motor Clean</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="elevetorMotorCleanByAir" checked={elevetorMotorCleanByAir} onCheckedChange={setElevetorMotorCleanByAir} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">5. Mc All Parts Clean</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="McAllPartsClean" checked={McAllPartsClean} onCheckedChange={setMcAllPartsClean} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">6. Bin Clean</Label>
                    <div className="flex  ml-20 items-center space-x-2">
                        <Switch id="binClean" checked={binClean} onCheckedChange={setBinClean} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">7. Callibration Roller Holes Clean</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="CallibrationRollerHolesClean" checked={CallibrationRollerHolesClean} onCheckedChange={setCallibrationRollerHolesClean} />
                    </div>
                </div>
                <div className="flex mt-2">
                    <Label style={{lineHeight:'5'}} className="w-1/8 pt-1 text-right text-gray-500 justify-center">Upload</Label>
                    <div className="flex ml-5 items-center space-x-2">
                        <Button className="bg-blue-500 text-center items-center justify-center h-7 w-15" type="button" onClick={callChildGetVideo}><FaCamera /></Button>
                        < BlobImageDisplay blob={cleanImageUrl} />
                        
                   
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Found Damaged Part</Label>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" checked={damage} onChange={(e) => setDamage(e.target.checked)} className="peer ml-20 h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-red-500 data-[state=checked]:bg-green-500" />
                    </div>
                </div>
                {damage && (
                    <>
                        <div className="flex">
                            <Label className="w-2/4 pt-2">Name Of the Parts</Label>
                            <div className="flex items-center space-x-2">
                                <Input className="w-100 text-center" placeholder="Name Of the Parts" value={partsName} onChange={(e) => setPartsName(e.target.value)} required={damage === true ? true : false} />
                            </div>
                        </div>
                        <div className="flex">
                            <Label style={{lineHeight:'5'}}  className="w-1/8 pt-1 text-right text-gray-500 justify-center">Upload</Label>
                            <div className="flex ml-5 items-center space-x-2">
                                <Button className="bg-blue-500 text-center items-center text-center h-7 w-15" type="button" onClick={callChildGetVideoBroken}><FaCamera /></Button>
                                < BlobImageDisplay blob={brokenImageUrl} />
                            
                            </div>
                        </div>
                    </>
                )}
              
                
                <div>
                    <Button className="bg-orange-500 text-center items-center justify-center h-8 w-20">Submit</Button>
                </div>
            </form>
            <dialog id="Photodailogclean" className="dashboard-modal">
                <button id="closePhotoclean" className="dashboard-modal-close-btn ">X </button>
                <span className="flex">
                    <CameraComponentClean onSave={(photo: any) => setCleaningImage(photo)} ref={CleancameraRef} />
                    

                </span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
            <dialog id="Photodailogcleandamage" className="dashboard-modal">
                <button id="closePhotodamage" className="dashboard-modal-close-btn ">X </button>
                <span className="flex">
                   
                    <CameraComponentBroken onSave={(photo: any) => setBrokenImage(photo)} ref={DamageCameraRef} />

                </span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>


        </div>
    );
}

export default GraddingMaintenanceCreate;
