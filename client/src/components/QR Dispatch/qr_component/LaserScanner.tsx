import { useEffect, useRef } from "react";

interface BarcodeScannerProps {
    onScan: (barcode: string) => void;
    paused?: boolean;
}

export default function BarcodeScannerDesktop({
    onScan,
    paused = false,
}: BarcodeScannerProps) {

    const bufferRef = useRef("");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {

        const handleKeyDown = (e: KeyboardEvent) => {

            if (paused) return;

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            // Scanner sends Enter at end
            if (e.key === "Enter") {

                const barcode = bufferRef.current.trim();

                if (barcode.length > 0) {
                    onScan(barcode);
                }

                bufferRef.current = "";
                return;
            }

            // Ignore control keys
            if (e.key.length === 1) {
                bufferRef.current += e.key;
            }

            timerRef.current = setTimeout(() => {
                bufferRef.current = "";
            }, 100);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onScan, paused]);

    return null;
}