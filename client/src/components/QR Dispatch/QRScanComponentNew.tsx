import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { BsUpcScan } from "react-icons/bs";

type QRScannerProps = {
  onResult?: (value: string) => void;
  oneTimeScan?: boolean;
};

const QRScannerNew: React.FC<QRScannerProps> = ({
  onResult = () => {},
  oneTimeScan = true,
}) => {
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState("");

  return (
    <div style={styles.container}>
      <p style={styles.title} className="flex gap-2 items-center">
        <BsUpcScan size={25} /> Scan Barcode
      </p>

      <div style={styles.scannerWrapper}>
        <Scanner
          paused={paused}
          formats={[
            "code_128",
            "ean_13",
            "ean_8",
            "upc_a",
            "upc_e",
            "itf",
            "codabar",
          ]}
          onScan={(result: any) => {
            if (!result?.length) return;

            const value = result[0].rawValue;
            console.log("Scanned:", value);

            onResult(value);

            if (oneTimeScan) setPaused(true);
          }}
          onError={(err: unknown) => {
            setError(
              err instanceof Error ? err.message : "Camera access error"
            );
          }}
          constraints={{
            width: { ideal: 400 },
            height: { ideal: 300 },
            facingMode: "environment",
          }}
          styles={{
            container: styles.cameraContainer,
            video: styles.video,
          }}
        />

        {/* 🔥 Barcode Scan Frame */}
        <div style={styles.barcodeFrame} />
      </div>

      {error && <p style={styles.error}>⚠ {error}</p>}
    </div>
  );
};

export default QRScannerNew;

const styles: Record<string, React.CSSProperties> = {
  container: {
    color: "#fff",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    marginBottom: "12px",
    fontSize: "18px",
    fontWeight: 600,
    background: "ghostwhite",
    padding: "6px 12px",
    color: "black",
    borderRadius: "6px",
  },

  scannerWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
    aspectRatio: "4 / 3", // 🔥 better for barcodes
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

  // 🔥 BARCODE SCAN FRAME
  barcodeFrame: {
    position: "absolute",
    top: "45%",
    left: "10%",
    width: "80%",
    height: "60px",
    border: "3px solid #22c55e",
    borderRadius: "10px",
    boxShadow: "0 0 18px rgba(34,197,94,0.9)",
    pointerEvents: "none",
  },

  error: {
    marginTop: "12px",
    color: "#f87171",
    fontSize: "14px",
  },
};
