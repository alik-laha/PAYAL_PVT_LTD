import { useEffect, useRef, useState } from "react";
import { BrowserCodeReader, IScannerControls } from "@zxing/browser";
import { Code128Reader, Result } from "@zxing/library";
import { Button } from "../ui/button";

type Props = {
  onResult: (value: string) => void;
  onStop: () => void;
};

const QRScannerFinal: React.FC<Props> = ({ onResult, onStop }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  const lastScannedRef = useRef<string | null>(null);
  const scanLockRef = useRef<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const [error, setError] = useState("");
  const [torchOn, setTorchOn] = useState(false);

  /* ---------- Initialize Audio Once ---------- */
  useEffect(() => {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;

    audioCtxRef.current = new AudioContext();

    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  /* ---------- Fast Beep ---------- */
  const beep = () => {
    const audioCtx = audioCtxRef.current;
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1300, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.08);
  };

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(60);
  };

  /* ---------- Start Optimized Scanner ---------- */
  useEffect(() => {
    if (!videoRef.current) return;

    // 🔥 CODE128 ONLY READER (FASTER)
    const codeReader = new BrowserCodeReader(new Code128Reader());

    codeReader
      .decodeFromConstraints(
        {
          video: {
            facingMode: "environment",
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        },
        videoRef.current,
        (result: Result | undefined) => {
          if (!result) return;

          const text = result.getText();

          if (scanLockRef.current) return;
          if (lastScannedRef.current === text) return;

          scanLockRef.current = true;
          lastScannedRef.current = text;

          beep();
          vibrate();
          onResult(text);

          // Faster unlock (warehouse optimized)
          setTimeout(() => {
            scanLockRef.current = false;
          }, 250);
        }
      )
      .then((controls) => {
        controlsRef.current = controls;
      })
      .catch((err) => {
        console.error(err);
        setError("Camera access error");
      });

    return () => {
      controlsRef.current?.stop();

      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  /* ---------- Torch ---------- */
  const toggleTorch = async () => {
    try {
      const stream = videoRef.current?.srcObject as MediaStream;
      const track = stream?.getVideoTracks()[0];
      if (!track) return;

      await track.applyConstraints({
        advanced: [{ torch: !torchOn } as any],
      });

      setTorchOn(!torchOn);
    } catch {
      console.log("Torch not supported");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="font-bold text-lg">Warehouse Scan Mode (Fast)</h2>

      <div className="relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-[35%] left-[8%] right-[8%] h-[30%] border-4 border-green-500 rounded-lg pointer-events-none" />
      </div>

      <div className="flex gap-3 mt-3">
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-white"
          onClick={toggleTorch}
        >
          {torchOn ? "🔦 Torch Off" : "🔦 Torch On"}
        </Button>

        <Button
          className="bg-red-500 hover:bg-red-600 text-white"
          onClick={() => {
            controlsRef.current?.stop();

            const stream = videoRef.current?.srcObject as MediaStream;
            stream?.getTracks().forEach((track) => track.stop());

            onStop();
          }}
        >
          Stop Scan
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default QRScannerFinal;
