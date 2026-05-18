import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import '/beep.mp3'

const QRScanner = ({ onScan }: any) => {
    const scannerRef = useRef<any>(null);
    const isRunning = useRef(false);
    const [isTorch, setIsTorch] = useState(false);
    const torchOn = useRef(false);

    const playBeep = () => {
        const audio = new Audio('/beep.mp3');
        audio.play();
    };

    const toggleTorch = async () => {
        const scanner = scannerRef.current;
        if (!scanner) return;

        try {
            await scanner.applyVideoConstraints({
                advanced: [{ torch: !torchOn.current }]
            });

            torchOn.current = !torchOn.current;
            setIsTorch(prev => !prev)
        } catch (err) {
            console.log("Torch not supported");
        }
    };

    useEffect(() => {
        const scanner = new Html5Qrcode("reader");
        scannerRef.current = scanner;

        scanner.start(
            { facingMode: "environment" },
            { fps: 5, qrbox: { width: 250, height: 400 } },
            (decodedText: string) => {
                scanner.pause();
                onScan(decodedText);
                playBeep();
                setTimeout(() => {
                    scanner.resume();
                }, 1000)
            },
            () => { }
        ).then(() => {
            isRunning.current = true;
        });

        return () => {
            if (scannerRef.current && isRunning.current) {
                scannerRef.current.stop()
                    .then(() => {
                        isRunning.current = false;
                    })
                    .catch(() => { });
            }
        };
    }, []);

    return (
        <>
            <div id="reader" style={{ width: "350px", maxHeight: "150px", overflow: 'hidden' }} />
            <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={toggleTorch}
            >
                {isTorch ? "🔦 Torch Off" : "🔦 Torch On"}
            </Button>
        </>
    );
};

export default QRScanner;