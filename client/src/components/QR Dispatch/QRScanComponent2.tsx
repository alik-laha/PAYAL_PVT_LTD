import { Scanner } from "@yudiel/react-qr-scanner";
import { useEffect, useRef, useState } from "react";
import { BsUpcScan } from "react-icons/bs";
import { Button } from "../ui/button";

type QRScannerProps = {
  onResult?: (value: string) => void;
  onStop?: () => void;
  oneTimeScan?: boolean;
  paused?: boolean;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
};

const QRScanner2: React.FC<QRScannerProps> = ({
  onResult = () => {},
  onStop = () => {},
  oneTimeScan = false, // 🔥 warehouse = continuous scan
  paused,
  setPaused,
}) => {
  const [error, setError] = useState<string>("");
  const lastScannedRef = useRef<string | null>(null);
  const scanLockRef = useRef<boolean>(false);

  /* ---------- Beep Sound ---------- */
  const beepRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    beepRef.current = new Audio("/beep.mp3"); 
    beepRef.current.volume = 1;
  }, []);

  const playBeep = () => {
    beepRef.current?.play().catch(() => {});
  };

  /* ---------- Vibration ---------- */
  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(150);
    }
  };

  /* ---------- Handle Scan ---------- */
  const handleScan = (result: any[]) => {
    if (!result || result.length === 0) return;

    const value = result[0]?.rawValue;
    if (!value) return;

    // 🔥 Prevent duplicate rapid scans
    if (scanLockRef.current) return;
    if (lastScannedRef.current === value) return;

    scanLockRef.current = true;
    lastScannedRef.current = value;

    playBeep();
    vibrate();

    onResult(value);

    if (oneTimeScan) {
      setPaused(true);
    }

    // unlock after 800ms (warehouse safe delay)
    setTimeout(() => {
      scanLockRef.current = false;
    }, 800);
  };

  return (
    <div style={styles.container}>
      <p style={styles.title} className="flex gap-2 items-center">
        <BsUpcScan size={24} />
        Warehouse Scan Mode
      </p>

      <div style={styles.scannerWrapper}>
        <Scanner
          paused={paused}
          scanDelay={150} // ⚡ Ultra fast scan interval
          onScan={handleScan}
          onError={(err: unknown) => {
            const message =
              err instanceof Error ? err.message : "Camera error";
            setError(message);
          }}
          constraints={{
            facingMode: { ideal: "environment" }, // 🔥 Force back camera
            width: { ideal: 1280 },
            height: { ideal: 720 },
          }}
          styles={{
            container: styles.cameraContainer,
            video: styles.video,
          }}
        />

        {/* 🎯 Barcode Guide Frame */}
        <div style={styles.frame}></div>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Place barcode inside green area
      </p>

      <Button
        className="mt-6 bg-red-500 hover:bg-red-600 w-36 text-white font-semibold"
        onClick={() => {
          setPaused(true);
          onStop();
        }}
      >
        ⛔ Stop Scan
      </Button>

      {error && <p style={styles.error}>⚠ {error}</p>}
    </div>
  );
};

export default QRScanner2;

/* ---------- Styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  container: {
    color: "#fff",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    marginBottom: "14px",
    fontSize: "18px",
    fontWeight: 600,
    background: "#f1f5f9",
    padding: "6px 10px",
    color: "#111",
    borderRadius: "8px",
  },

  scannerWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "500px",
    aspectRatio: "4 / 3", // 🔥 Better for barcode
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  },

  cameraContainer: {
    width: "100%",
    height: "100%",
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  frame: {
    position: "absolute",
    top: "35%",
    left: "8%",
    right: "8%",
    height: "30%",
    border: "3px solid #22c55e",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(34,197,94,0.7)",
    pointerEvents: "none",
  },

  error: {
    marginTop: "12px",
    color: "#f87171",
    fontSize: "14px",
  },
};
