import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";


interface QRScannerProps {
    onScan: (decodedText: string) => void;
    paused?: boolean;
}


const QRScanner2 = ({ onScan, paused = false }: QRScannerProps) => {


    const scannerRef = useRef<Html5Qrcode | null>(null);


    const [isTorch, setIsTorch] = useState(false);
    const [torchSupported, setTorchSupported] = useState(false);


    const torchOn = useRef(false);


    // Prevent duplicate scans
    const scanLockRef = useRef(false);


    // Store last scanned value
    const lastScanRef = useRef("");


    // -----------------------------------
    // Beep Sound
    // -----------------------------------
    const playBeep = () => {
        try {
            const audio = new Audio("/beep.mp3");


            audio.volume = 1;


            audio.play().catch(() => { });


        } catch (err) {
            console.log(err);
        }
    };


    // -----------------------------------
    // Detect Torch State
    // iPhone sometimes auto disables torch
    // -----------------------------------
    const syncTorchState = async () => {


        try {


            const scanner: any = scannerRef.current;


            if (!scanner) return;


            const track =
                scanner.getRunningTrackSettings?.();


            const torchState = !!track?.torch;


            torchOn.current = torchState;


            setIsTorch(torchState);


        } catch (err) {
            console.log(err);
        }
    };


    // -----------------------------------
    // Toggle Torch
    // -----------------------------------
    const toggleTorch = async () => {


        try {


            const scanner: any = scannerRef.current;


            if (!scanner) return;


            const capabilities =
                scanner.getRunningTrackCapabilities?.();


            if (!capabilities?.torch) {
                alert("Torch not supported");
                return;
            }


            const newTorchState = !torchOn.current;


            await scanner.applyVideoConstraints({
                advanced: [
                    {
                        torch: newTorchState,
                    } as any,
                ],
            });


            torchOn.current = newTorchState;


            setIsTorch(newTorchState);


        } catch (err) {
            console.log("Torch error:", err);
        }
    };


    // -----------------------------------
    // Initialize Scanner
    // -----------------------------------
    useEffect(() => {


        const scanner = new Html5Qrcode("reader");


        scannerRef.current = scanner;


        const startScanner = async () => {


            try {


                await scanner.start(
                    {
                        facingMode: "environment",
                    },


                    {
                        fps: 10,
                        qrbox: (
                            viewfinderWidth: number,
                            viewfinderHeight: number
                        ) => {


                            const minEdge = Math.min(
                                viewfinderWidth,
                                viewfinderHeight
                            );


                            const width = Math.floor(minEdge * 0.9);
                            const height = Math.floor(minEdge * 0.7);



                            return {
                                width: width,
                                height: height,
                            };
                        },
                        aspectRatio: 1.777778,
                    } as any,

                    // SUCCESS CALLBACK
                    async (decodedText: string) => {


                        // -----------------------------------
                        // HARD LOCK
                        // prevents duplicate scan in Android
                        // -----------------------------------
                        if (scanLockRef.current || paused) {
                            return;
                        }

                        // Same barcode protection
                        if (decodedText === lastScanRef.current) {
                            return;
                        }


                        scanLockRef.current = true;


                        lastScanRef.current = decodedText;


                        playBeep();


                        onScan(decodedText);


                        // -----------------------------------
                        // iPhone torch auto-off fix
                        // -----------------------------------
                        setTimeout(() => {
                            syncTorchState();
                        }, 300);


                        // -----------------------------------
                        // Unlock after delay
                        // -----------------------------------
                        setTimeout(() => {


                            scanLockRef.current = false;


                            lastScanRef.current = "";


                        }, 2000);
                    },


                    // ERROR CALLBACK
                    () => { }
                );


                // Torch Support Detection
                try {


                    const scannerAny: any = scanner;


                    const capabilities =
                        scannerAny.getRunningTrackCapabilities?.();


                    if (capabilities?.torch) {
                        setTorchSupported(true);
                    }


                } catch (err) {
                    console.log(err);
                }


            } catch (err) {
                console.log("Scanner start error:", err);
            }
        };


        startScanner();


        // -----------------------------------
        // Cleanup
        // -----------------------------------
        return () => {


            const stopScanner = async () => {


                try {


                    if (scannerRef.current) {


                        const scannerAny: any = scannerRef.current;


                        const state =
                            scannerAny.getState?.();


                        // 2 = scanning
                        if (state === 2) {


                            await scannerAny.stop();


                            await scannerAny.clear();
                        }
                    }


                } catch (err) {
                    console.log("Scanner cleanup error:", err);
                }
            };


            stopScanner();
        };


    }, [onScan]);


    return (
        <div className="flex flex-col items-center gap-3 w-full">


            <div
                id="reader"
                style={{
                    width: "100%",
                    maxWidth: "350px",
                    borderRadius: "12px",
                    overflow: "hidden",
                }}
            />


            {torchSupported && (
                <Button
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={toggleTorch}
                >
                    {isTorch
                        ? "🔦 Torch Off"
                        : "🔦 Torch On"}
                </Button>
            )}


        </div>
    );
};


export default QRScanner2;