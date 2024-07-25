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
import CameraComponentBroken from "../CameraComponentBroken";

const ScoopingSectionCuttingCreate = () => {
    const [GraddingMachine, setGraddingMachine] = useState<AssetData[]>([]);
    const [mc_name, setMc_name] = useState<string>("");
    const Date = useRef<HTMLInputElement>(null);
    const CleancameraRef = useRef<any>(null);
    const DamageCameraRef = useRef<any>(null);
    const [damage, setDamage] = useState<boolean>(false);
    const [partsName, setPartsName] = useState<string>("");
    const [cleanningFiles, setCleaningFiles] = useState<Blob[]>([]);
    const [damageFiles, setDamageFiles] = useState<Blob[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [cleanImageUrl, setCleanImageUrl] = useState<string[]>([])
    const [brokenImageUrl, setBrokenImageUrl] = useState<string[]>([])
    const [colorprogress, setColorProgress] = useState<string>('')

    const [gear_m3_30ta, setGear_m3_30ta] = useState<boolean>(false);
    const [gear_m3_40tb, setGear_m3_40tb] = useState<boolean>(false);
    const [gear_m372ta_50_18r, setGear_m372ta_50_18r] = useState<boolean>(false);
    const [sap, setSap] = useState<boolean>(false);
    const [bladeUp, setBladeUp] = useState<boolean>(false);
    const [bladeDown, setBladeDown] = useState<boolean>(false);
    const [speaderDown, setSpeaderDown] = useState<boolean>(false);
    const [brushBig, setBrushBig] = useState<boolean>(false);
    const [brushSmall, setBrushSmall] = useState<boolean>(false);
    const [chainOneSmall, setChainOneSmall] = useState<boolean>(false);
    const [chainTwoLarge, setChainTwoLarge] = useState<boolean>(false);
    const [chainThreeBig, setChainThreeBig] = useState<boolean>(false);
    const [chainFourBigTwo, setChainFourBigTwo] = useState<boolean>(false);
    const [bigChainPatti, setBigChainPatti] = useState<boolean>(false);
    const [bigTwoChainPatti, setBigTwoChainPatti] = useState<boolean>(false);
    const [spring, setSpring] = useState<boolean>(false);
    const [trayCup, setTrayCup] = useState<boolean>(false);
    const [gear_m3_60ta, setGear_m3_60ta] = useState<boolean>(false);
    const [motorPinionGear, setMotorPinionGear] = useState<boolean>(false);
    const [cuttingChain, setCuttingChain] = useState<boolean>(false);

    useEffect(() => {
        axios.get('/api/asset/getallmachineformaintenence/Scooping')
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
        const totalSteps = 20;
        const completedSteps = [
            gear_m3_30ta,
            gear_m3_40tb,
            gear_m372ta_50_18r,
            sap,
            bladeUp,
            bladeDown,
            speaderDown,
            brushBig,
            brushSmall,
            chainOneSmall,
            chainTwoLarge,
            chainThreeBig,
            chainFourBigTwo,
            bigChainPatti,
            bigTwoChainPatti,
            spring,
            trayCup,
            gear_m3_60ta,
            motorPinionGear,
            cuttingChain

        ].filter(Boolean).length;
        setProgress((completedSteps / totalSteps) * 100);
        if (progress <= 20) {
            setColorProgress('Worst')
        }
        if (progress > 20 && progress <= 40) {
            setColorProgress('Bad')
        }
        if (progress > 40 && progress <= 60) {
            setColorProgress('Nominal')
        }
        if (progress > 60 && progress <= 80) {
            setColorProgress('Better')
        }
        if (progress > 80) {
            setColorProgress('Best')
        }
    }, [
        gear_m3_30ta,
        gear_m3_40tb,
        gear_m372ta_50_18r,
        sap,
        bladeUp,
        bladeDown,
        speaderDown,
        brushBig,
        brushSmall,
        chainOneSmall,
        chainTwoLarge,
        chainThreeBig,
        chainFourBigTwo,
        bigChainPatti,
        bigTwoChainPatti,
        spring,
        trayCup,
        gear_m3_60ta,
        motorPinionGear,
        cuttingChain,
        progress
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
        formData.append("damage", damage.toString());
        formData.append("partsName", partsName);
        formData.append("percentage", progress.toString());
        formData.append("gear_m3_30ta", gear_m3_30ta.toString());
        formData.append("gear_m3_40tb", gear_m3_40tb.toString());
        formData.append("gear_m372ta_50_18r", gear_m372ta_50_18r.toString());
        formData.append("sap", sap.toString());
        formData.append("bladeUp", bladeUp.toString());
        formData.append("bladeDown", bladeDown.toString());
        formData.append("speaderDown", speaderDown.toString());
        formData.append("brushBig", brushBig.toString());
        formData.append("brushSmall", brushSmall.toString());
        formData.append("chainOneSmall", chainOneSmall.toString());
        formData.append("chainTwoLarge", chainTwoLarge.toString());
        formData.append("chainThreeBig", chainThreeBig.toString());
        formData.append("chainFourBigTwo", chainFourBigTwo.toString());
        formData.append("bigChainPatti", bigChainPatti.toString());
        formData.append("bigTwoChainPatti", bigTwoChainPatti.toString());
        formData.append("spring", spring.toString());
        formData.append("trayCup", trayCup.toString());
        formData.append("gear_m3_60ta", gear_m3_60ta.toString());
        formData.append("motorPinionGear", motorPinionGear.toString());
        formData.append("cuttingChain", cuttingChain.toString());

        axios.post("/api/cleaning/cuttingcleancreate", formData)
            .then((res) => {
                console.log("Files uploaded successfully", res);
                alert("Notice has been Uploaded Successfully");
            })
            .catch(err => {
                console.error(err);
            });
    };


    const successdialogclean = document.getElementById('CuttingPhotodailogclean') as HTMLInputElement;
    const successdialogcleandamage = document.getElementById('CuttingPhotodailogcleandamage') as HTMLInputElement;
    const closeDialogButton = document.getElementById('CuttingclosePhotoclean') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('CuttingclosePhotodamage') as HTMLInputElement;
    const setCleaningImage = (photo: any) => {
        let data: Blob[] = [];
        photo.toBlob((blob: Blob) => {
            data = [...cleanningFiles, blob]
            setCleaningFiles(data);
            CreateurlFromblob(data)
        });
        (successdialogclean as any).close();
    }
    const setBrokenImage = (photo: any) => {
        let data: Blob[] = [];
        photo.toBlob((blob: Blob) => {
            data = [...damageFiles, blob]
            setDamageFiles(data);
            CreateurlFromBrokenblob(data)
        });
        (successdialogcleandamage as any).close();
    }

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialogclean != null) {
                (successdialogclean as any).close();
                CleancameraRef.current.stopVideo();
            }


        });
    }
    if (errorcloseDialogButton) {
        errorcloseDialogButton.addEventListener('click', () => {
            if (errorcloseDialogButton != null) {
                (successdialogcleandamage as any).close();
                DamageCameraRef.current.stopVideo();

            }

        });
    }
    const callChildGetVideo = () => {
        (successdialogclean as any).showModal()
        if (CleancameraRef.current) {
            CleancameraRef.current.getVIdeo();
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
                    <Label className="w-2/4 pt-1">1. GEAR= M3-72TA 50-18R*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={gear_m3_30ta} onCheckedChange={setGear_m3_30ta} />
                    </div>
                    <Label className="w-2/4 pt-1">2. GEAR= M3-40TB*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={gear_m3_40tb} onCheckedChange={setGear_m3_40tb} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">3. GEAR= M3-72TA 50-18R*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={gear_m372ta_50_18r} onCheckedChange={setGear_m372ta_50_18r} />
                    </div>
                    <Label className="w-2/4 pt-1">4. SAP*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={sap} onCheckedChange={setSap} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">5. BLADE UP*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={bladeUp} onCheckedChange={setBladeUp} />
                    </div>
                    <Label className="w-2/4 pt-1">6. BLADE DOWN*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={bladeDown} onCheckedChange={setBladeDown} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">7. SPREADER DOWN*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={speaderDown} onCheckedChange={setSpeaderDown} />
                    </div>
                    <Label className="w-2/4 pt-1">8. BRUSH BIG*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={brushBig} onCheckedChange={setBrushBig} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">9. BRUSH SMALL*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={brushSmall} onCheckedChange={setBrushSmall} />
                    </div>
                    <Label className="w-2/4 pt-1">10. CHAIN ONE SMALL*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={chainOneSmall} onCheckedChange={setChainOneSmall} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">11. CHAIN TWO LARGE*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={chainTwoLarge} onCheckedChange={setChainTwoLarge} />
                    </div>
                    <Label className="w-2/4 pt-1">12. CHAIN THREE BIG*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={chainThreeBig} onCheckedChange={setChainThreeBig} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">13. CHAIN FOUR BIG TWO*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={chainFourBigTwo} onCheckedChange={setChainFourBigTwo} />
                    </div>
                    <Label className="w-2/4 pt-1">14. BIG CHAIN PATTI*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={bigChainPatti} onCheckedChange={setBigChainPatti} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">15. BIG TWO CHAIN PATTI*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={bigTwoChainPatti} onCheckedChange={setBigTwoChainPatti} />
                    </div>
                    <Label className="w-2/4 pt-1">16. SPRING*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={spring} onCheckedChange={setSpring} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">17. TRAY CUP*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={trayCup} onCheckedChange={setTrayCup} />
                    </div>
                    <Label className="w-2/4 pt-1">18. GEAR= M3-60TA*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={gear_m3_60ta} onCheckedChange={setGear_m3_60ta} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">19. MOTOR PINION GEAR*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={motorPinionGear} onCheckedChange={setMotorPinionGear} />
                    </div>
                    <Label className="w-2/4 pt-1">20. CUTTING CHAIN*</Label>
                    <div className="flex ml-20 items-center space-x-2">
                        <Switch id="dustTable" checked={cuttingChain} onCheckedChange={setCuttingChain} />
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
                                            const data = cleanImageUrl.filter((item, i) =>{
                                                i !== index
                                                console.log(item)})
                                            setCleanImageUrl(data)
                                        }}>Clear</Button>
                                    </div>
                                ))
                            }
                        </div>



                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Found Damaged Part</Label>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" checked={damage} onChange={(e) => setDamage(e.target.checked)} className="peer ml-20 h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-red-500 data-[state=checked]:bg-green-500" />
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
                                                        const data = brokenImageUrl.filter((item, i) =>{
                                                            i !== index
                                                            console.log(item)})
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
            </form >
            <dialog id="CuttingPhotodailogclean" className="dashboard-modal">
                <button id="CuttingclosePhotoclean" className="dashboard-modal-close-btn ">X </button>
                <span className="flex">
                    <CameraComponentClean onSave={(photo: any) => setCleaningImage(photo)} ref={CleancameraRef} />


                </span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
            <dialog id="CuttingPhotodailogcleandamage" className="dashboard-modal">
                <button id="CuttingclosePhotodamage" className="dashboard-modal-close-btn ">X </button>
                <span className="flex">

                    <CameraComponentBroken onSave={(photo: any) => setBrokenImage(photo)} ref={DamageCameraRef} />

                </span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>


        </div >
    );
}

export default ScoopingSectionCuttingCreate;
