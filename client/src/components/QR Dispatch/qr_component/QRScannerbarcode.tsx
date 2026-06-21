import { useEffect, useRef } from "react";

interface Props {
  onScan: (value: string) => void;
  paused?: boolean;
}

export default function FastQRScanner({
  onScan,
  paused = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scanLockRef = useRef(false);
  const lastScanRef = useRef("");

  const detectorRef = useRef<BarcodeDetector | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationId: number;

    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {
              ideal: "environment",
            },
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
        });

        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        detectorRef.current = new BarcodeDetector({
          formats: ["code_128"],
        });

        scanLoop();
      } catch (err) {
        console.error(err);
      }
    };

    const scanLoop = async () => {
      if (
        !videoRef.current ||
        !detectorRef.current
      ) {
        animationId = requestAnimationFrame(scanLoop);
        return;
      }

      try {
        if (!paused) {
          const barcodes =
            await detectorRef.current.detect(
              videoRef.current
            );

          if (barcodes.length > 0) {
            const value =
              barcodes[0].rawValue || "";

            if (
              value &&
              value !== lastScanRef.current &&
              !scanLockRef.current
            ) {
              scanLockRef.current = true;

              lastScanRef.current = value;

              onScan(value);

              setTimeout(() => {
                scanLockRef.current = false;
                lastScanRef.current = "";
              }, 300);
            }
          }
        }
      } catch (err) {
        console.error(err);
      }

      animationId =
        requestAnimationFrame(scanLoop);
    };

    start();

    return () => {
      cancelAnimationFrame(animationId);

      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [onScan, paused]);

  return (
    <div className="w-full flex justify-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full max-w-md rounded-lg"
      />
    </div>
  );
}