import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { BsUpcScan } from "react-icons/bs";
import { Button } from "../ui/button";

type QRScannerProps = {
  onResult?: (value: string) => void;
  onStop?: (value: void) => void;
  oneTimeScan?: boolean;
  paused?:boolean;
  setPaused:React.Dispatch<React.SetStateAction<boolean>>
};

const QRScanner: React.FC<QRScannerProps> = ({
  onResult = () => {},onStop = () => {},
  oneTimeScan = true,paused,setPaused,
}) => {
  //const [paused, setPaused] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <div style={styles.container}>
      <p style={styles.title} className="flex flex-row gap-2 items-center"><BsUpcScan size={25}/> Scan Barcode</p>

      <div style={styles.scannerWrapper}>
        <Scanner
          paused={paused}
          onScan={(result:any) => {
            if (!result) return;
            console.log(result[0].rawValue);
            
           

            onResult(result[0].rawValue);

            if (oneTimeScan) setPaused(true);
          }}
          onError={(err: unknown) => {
            const message =
              err instanceof Error ? err.message : "Camera access error";
            setError(message);
          }}
          constraints={{
            width: { ideal: 300 },
            height: { ideal: 300 },
          }}
          styles={{
            container: styles.cameraContainer,
            video: styles.video,
          }}
        />
    
      </div>
          <Button type='submit'
  className="mt-8 bg-red-400 hover:bg-red-600 w-32 text-white font-semibold"
  onClick={() => {
    setPaused(true);
    onStop(); // return to main form
  }}
>
  ⛔ Stop Scan
</Button>

      {error && <p style={styles.error}>⚠ {error}</p>}

    </div>
  );
};

export default QRScanner;

const styles: Record<string, React.CSSProperties> = {
  container: {
    
    //background: "#020617",
    
    color: "#fff",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    marginBottom: "16px",
    fontSize: "18px",
    fontWeight: 600,
    background:'ghostwhite',
    padding:'5px',
    color:'black'
  },

  scannerWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
    aspectRatio: "1 / 1",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
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
    inset: "18%",
    border: "3px solid #22c55e",
    borderRadius: "14px",
    boxShadow: "0 0 20px rgba(34,197,94,0.8)",
    pointerEvents: "none",
  },

  controls: {
    marginTop: "20px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  btn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#22c55e",
    color: "#000",
    fontWeight: 600,
    cursor: "pointer",
  },

  error: {
    marginTop: "12px",
    color: "#f87171",
    fontSize: "14px",
  },
};