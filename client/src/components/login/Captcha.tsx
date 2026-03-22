import React, { useRef, useEffect, useContext } from "react";
import { HiRefresh } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import Context from "../context/context";

const Captcha: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setGenerateCaptcha, typedCaptcha, setTypedCaptcha } =
    useContext(Context);

  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const characters = "0123456789";
    let generatedText = "";

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate random CAPTCHA
    for (let i = 0; i < 5; i++) {
      generatedText += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    // 👇 Better font for iPhone + readability
    ctx.font = "bold 22px Arial, Helvetica, sans-serif";
    ctx.fillStyle = "#111"; // high contrast
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw text with slight rotation
    for (let i = 0; i < generatedText.length; i++) {
      const x = (i + 1) * (canvas.width / 6);
      const y = canvas.height / 2;
      const rotation = (Math.random() - 0.5) * 0.3;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillText(generatedText[i], 0, 0);
      ctx.restore();
    }

    setGenerateCaptcha(generatedText);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="flex items-center gap-2 mt-2">

      {/* CAPTCHA Canvas */}
      <canvas
        ref={canvasRef}
        width="140"
        height="40"
        className="border border-gray-300 rounded-md shadow-sm"
      />

      {/* Refresh Button */}
      <button
        type="button"
        onClick={generateCaptcha}
        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
      >
        <HiRefresh size={20} />
      </button>

      {/* Input */}
      <Input
        type="text"
        placeholder="Enter Captcha"
        className="h-10 text-center tracking-widest border-gray-400 rounded-md"
        value={typedCaptcha}
        onChange={(e) => setTypedCaptcha(e.target.value)}
      />
    </div>
  );
};

export default Captcha;