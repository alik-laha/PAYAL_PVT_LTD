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
import { Item } from "@radix-ui/react-menubar";

const AbhayMcCleaningCreate = () => {
    const Date = useRef<HTMLInputElement>(null);
    const CleancameraRef = useRef<any>(null);
    const DamageCameraRef = useRef<any>(null);
    const [mainElevetorCup, setMainElevetorCup] = useState<boolean>(false);
    const [mainElevetorGearBox, setMainElevetorGearBox] = useState<boolean>(false);
    const [mainElevetorSpocket, setMainElevetorSpocket] = useState<boolean>(false);
    const [mainElevetorChain, setMainElevetorChain] = useState<boolean>(false);
    const [vibretor_1_scooperFan, setVibretor_1_scooperFan] = useState<boolean>(false);
    const [vibretor_1_clamSap, setVibretor_1_clamSap] = useState<boolean>(false);
    const [vibretor_1_towerBlower, setVibretor_1_towerBlower] = useState<boolean>(false);
    const [vibretor_2_clamSap, setVibretor_2_clamSap] = useState<boolean>(false);
    const [vibretor2_scooperFan, setVibretor2_scooperFan] = useState<boolean>(false);
    const [vibretor_2_towerBlower, setVibretor_2_towerBlower] = useState<boolean>(false);
    const [wholesElevetorCup, setWholesElevetorCup] = useState<boolean>(false);
    const [wholesElevetorSap, setWholesElevetorSap] = useState<boolean>(false);
    const [wholesElevetorBlower, setWholesElevetorBlower] = useState<boolean>(false);
    const [wholesElevetorPully, setWholesElevetorPully] = useState<boolean>(false);
    const [wholeElevetorSplitsAndBlower, setWholeElevetorSplitsAndBlower] = useState<boolean>(false);
    const [wholeElevetorGearBox, setWholeElevetorGearBox] = useState<boolean>(false);
    const [sizerElevetor_1_cup, setSizerElevetor_1_cup] = useState<boolean>(false);
    const [sizerElevetor_2_cup, setSizerElevetor_2_cup] = useState<boolean>(false);
    const [shellHopper, setShellHopper] = useState<boolean>(false);
    const [shelllBlower, setShellBlower] = useState<boolean>(false);
    const [sizerElevetor_2toUnscoopTableScooperFan, setSizerElevetor_2toUnscoopTableScooperFan] = useState<boolean>(false);
    const [panaboardAllPartsCleanByHandBlower, setPanaboardAllPartsCleanByHandBlower] = useState<boolean>(false);
    const [damage, setDamage] = useState<boolean>(false);
    const [partsName, setPartsName] = useState<string>("");
    const [cleanningFiles, setCleaningFiles] = useState<Blob[]>([]);
    const [damageFiles, setDamageFiles] = useState<Blob[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [cleanImageUrl, setCleanImageUrl] = useState<string[]>([])
    const [brokenImageUrl, setBrokenImageUrl] = useState<string[]>([])
    const [colorprogress, setColorProgress] = useState<string>('')


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
        const totalSteps = 22;
        const completedSteps = [
            mainElevetorCup,
            mainElevetorGearBox,
            mainElevetorSpocket,
            mainElevetorChain,
            vibretor_1_scooperFan,
            vibretor_1_clamSap,
            vibretor_1_towerBlower,
            vibretor_2_clamSap,
            vibretor2_scooperFan,
            vibretor_2_towerBlower,
            wholesElevetorCup,
            wholesElevetorSap,
            wholesElevetorBlower,
            wholesElevetorPully,
            wholeElevetorSplitsAndBlower,
            wholeElevetorGearBox,
            sizerElevetor_1_cup,
            sizerElevetor_2_cup,
            shellHopper,
            shelllBlower,
            sizerElevetor_2toUnscoopTableScooperFan,
            panaboardAllPartsCleanByHandBlower

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
        mainElevetorCup,
        mainElevetorGearBox,
        mainElevetorSpocket,
        mainElevetorChain,
        vibretor_1_scooperFan,
        vibretor_1_clamSap,
        vibretor_1_towerBlower,
        vibretor_2_clamSap,
        vibretor2_scooperFan,
        vibretor_2_towerBlower,
        wholesElevetorCup,
        wholesElevetorSap,
        wholesElevetorBlower,
        wholesElevetorPully,
        wholeElevetorSplitsAndBlower,
        wholeElevetorGearBox,
        sizerElevetor_1_cup,
        sizerElevetor_2_cup,
        shellHopper,
        shelllBlower,
        sizerElevetor_2toUnscoopTableScooperFan,
        panaboardAllPartsCleanByHandBlower,
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
        formData.append("date", Date.current?.value || "");
        formData.append("damage", damage.toString());
        formData.append("partsName", partsName);
        formData.append("percentage", progress.toString());
        formData.append("mainElevetorCup", mainElevetorCup.toString());
        formData.append("mainElevetorGearBox", mainElevetorGearBox.toString());
        formData.append("mainElevetorSpocket", mainElevetorSpocket.toString());
        formData.append("mainElevetorChain", mainElevetorChain.toString());
        formData.append("vibretor_1_scooperFan", vibretor_1_scooperFan.toString());
        formData.append("vibretor_1_clamSap", vibretor_1_clamSap.toString());
        formData.append("vibretor_1_towerBlower", vibretor_1_towerBlower.toString());
        formData.append("vibretor_2_clamSap", vibretor_2_clamSap.toString());
        formData.append("vibretor2_scooperFan", vibretor2_scooperFan.toString());
        formData.append("vibretor_2_towerBlower", vibretor_2_towerBlower.toString());
        formData.append("wholesElevetorCup", wholesElevetorCup.toString());
        formData.append("wholesElevetorSap", wholesElevetorSap.toString());
        formData.append("wholesElevetorBlower", wholesElevetorBlower.toString());
        formData.append("wholesElevetorPully", wholesElevetorPully.toString());
        formData.append("wholeElevetorSplitsAndBlower", wholeElevetorSplitsAndBlower.toString());
        formData.append("wholeElevetorGearBox", wholeElevetorGearBox.toString());
        formData.append("sizerElevetor_1_cup", sizerElevetor_1_cup.toString());
        formData.append("sizerElevetor_2_cup", sizerElevetor_2_cup.toString());
        formData.append("shelllBlower", shelllBlower.toString());
        formData.append("shellHopper", shellHopper.toString());
        formData.append("sizerElevetor_2toUnscoopTableScooperFan", sizerElevetor_2toUnscoopTableScooperFan.toString());
        formData.append("panaboardAllPartsCleanByHandBlower", panaboardAllPartsCleanByHandBlower.toString());

        axios.post("/api/cleaning/abhayMcCleanCreate", formData)
            .then((res) => {
                console.log("Files uploaded successfully", res);
                alert("Notice has been Uploaded Successfully");
            })
            .catch(err => {
                console.error(err);
            });
    };


    const successdialogclean = document.getElementById('AbhayMcPhotodailogclean') as HTMLInputElement;
    const successdialogcleandamage = document.getElementById('AbhayMcPhotodailogcleandamage') as HTMLInputElement;
    const closeDialogButton = document.getElementById('AbhayMcclosePhotoclean') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('AbhayMcclosePhotodamage') as HTMLInputElement;
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
                    <Label className="w-2/4 pt-1">Date Of Cleaning</Label>
                    <Input className="w-2/4 justify-center" placeholder="Date" ref={Date} type='date' required />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Main Elevetor Cup</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={mainElevetorCup} onCheckedChange={setMainElevetorCup} />
                    </div>
                    <Label className="w-2/4 pt-2">Main Elevetor Gear Box</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={mainElevetorGearBox} onCheckedChange={setMainElevetorGearBox} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Main Elevetor Spocket</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={mainElevetorSpocket} onCheckedChange={setMainElevetorSpocket} />
                    </div>
                    <Label className="w-2/4 pt-2">Main Elevetor Chain</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={mainElevetorChain} onCheckedChange={setMainElevetorChain} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Vibretor 1 Scooper Fan</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={vibretor_1_scooperFan} onCheckedChange={setVibretor_1_scooperFan} />
                    </div>
                    <Label className="w-2/4 pt-2">Vibretor 1 Clam Sap</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={vibretor_1_clamSap} onCheckedChange={setVibretor_1_clamSap} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Vibretor 1 Tower Blower</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={vibretor_1_towerBlower} onCheckedChange={setVibretor_1_towerBlower} />
                    </div>
                    <Label className="w-2/4 pt-2">Vibretor 2 Clam Sap</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={vibretor_2_clamSap} onCheckedChange={setVibretor_2_clamSap} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Vibretor 2 Scooper Fan</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={vibretor2_scooperFan} onCheckedChange={setVibretor2_scooperFan} />
                    </div>
                    <Label className="w-2/4 pt-2">Vibretor 2 Tower Blower</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={vibretor_2_towerBlower} onCheckedChange={setVibretor_2_towerBlower} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Wholes Elevetor Cup</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={wholesElevetorCup} onCheckedChange={setWholesElevetorCup} />
                    </div>
                    <Label className="w-2/4 pt-2">Wholes Elevetor Sap</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={wholesElevetorSap} onCheckedChange={setWholesElevetorSap} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Wholes Elevetor Blower</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={wholesElevetorBlower} onCheckedChange={setWholesElevetorBlower} />
                    </div>
                    <Label className="w-2/4 pt-2">Wholes Elevetor Pully</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={wholesElevetorPully} onCheckedChange={setWholesElevetorPully} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Whole Elevetor Splits And Blower</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={wholeElevetorSplitsAndBlower} onCheckedChange={setWholeElevetorSplitsAndBlower} />
                    </div>
                    <Label className="w-2/4 pt-2">Whole Elevetor Gear Box</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={wholeElevetorGearBox} onCheckedChange={setWholeElevetorGearBox} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Sizer Elevetor 1 Cup</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={sizerElevetor_1_cup} onCheckedChange={setSizerElevetor_1_cup} />
                    </div>
                    <Label className="w-2/4 pt-2">Sizer Elevetor 2 Cup</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={sizerElevetor_2_cup} onCheckedChange={setSizerElevetor_2_cup} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Shell Hopper</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={shellHopper} onCheckedChange={setShellHopper} />
                    </div>
                    <Label className="w-2/4 pt-2">Shell Blower</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={shelllBlower} onCheckedChange={setShellBlower} />
                    </div>
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-2">Sizer Elevetor 2 to Unscoop Table Scooper Fan</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={sizerElevetor_2toUnscoopTableScooperFan} onCheckedChange={setSizerElevetor_2toUnscoopTableScooperFan} />
                    </div>
                    <Label className="w-2/4 pt-2">Panaboard All Parts Clean By Hand Blower</Label>
                    <div className="flex items-center space-x-2">
                        <Switch checked={panaboardAllPartsCleanByHandBlower} onCheckedChange={setPanaboardAllPartsCleanByHandBlower} />
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
                                            const data = cleanImageUrl.filter((url: string, i: number) =>
                                                 {i !== index
                                                    console.log(url)
                                                 })
                                            
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
                                                        const data = brokenImageUrl.filter((item, i) => {i !== index
                                                            console.log(item)
                                                        })
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
            <dialog id="AbhayMcPhotodailogclean" className="dashboard-modal">
                <button id="AbhayMcclosePhotoclean" className="dashboard-modal-close-btn ">X </button>
                <span className="flex">
                    <CameraComponentClean onSave={(photo: any) => setCleaningImage(photo)} ref={CleancameraRef} />


                </span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
            <dialog id="AbhayMcPhotodailogcleandamage" className="dashboard-modal">
                <button id="AbhayMcclosePhotodamage" className="dashboard-modal-close-btn ">X </button>
                <span className="flex">

                    <CameraComponentBroken onSave={(photo: any) => setBrokenImage(photo)} ref={DamageCameraRef} />

                </span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>


        </div >
    );
}

export default AbhayMcCleaningCreate;
