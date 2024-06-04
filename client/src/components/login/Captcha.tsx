import React, { useRef, useEffect } from 'react';
import { HiRefresh } from "react-icons/hi";
import { Input } from "@/components/ui/input"
import { useContext } from 'react';
import Context from '../context/context';

const Captcha: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setGenerateCaptcha, typedCaptcha, setTypedCaptcha } = useContext(Context);


  const generateCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedText = '';

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate random background color
    ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
    //ctx.fillStyle='white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate random CAPTCHA text
    for (let i = 0; i < 5; i++) {
      generatedText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Set CAPTCHA text properties
    ctx.font = '18px Arial';
    if (ctx.fillStyle === "#000000") {
      ctx.fillStyle = 'white';
    } else {
      ctx.fillStyle = 'black';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw CAPTCHA text with some random transformations
    for (let i = 0; i < generatedText.length; i++) {
      const x = (i + 1) * (canvas.width / 7);
      const y = canvas.height / 2;
      const rotation = (Math.random() - 0.5) * 0.4;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillText(generatedText.charAt(i), 0, 0);
      ctx.restore();
    }

    // Draw some random lines for added security
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Store the CAPTCHA text for validation (you would need to implement the validation logic)
    setGenerateCaptcha(generatedText);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }} >

      <canvas id="captchaCanvas" ref={canvasRef} width="110" height="40" style={{ border: '1px solid #ccc', marginRight: '3%' }}></canvas>

      <button type="button" onClick={generateCaptcha}><HiRefresh /></button>
      <Input height={40} type="text" placeholder="Captcha Text" className=' ml-2 h-11' value={typedCaptcha} onChange={(e) => setTypedCaptcha(e.target.value)} />
      {/* <p>CAPTCHA Text: {captchaText}</p> */}
    </div>
  );
};

export default Captcha;