import React, { useState, useEffect, useRef } from 'react';


interface CaptchaProps {
  onVerify: (isVerified: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [captcha, setCaptcha] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    setCaptcha(result);
  };

  const renderCaptcha = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '20px Arial';
        ctx.fillText(captcha, 10, 30);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleVerify = () => {
    if (input === captcha) {
      onVerify(true);
      alert('CAPTCHA Verified');
    } else {
      onVerify(false);
      alert('CAPTCHA Incorrect');
    }
    generateCaptcha();
    setInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    renderCaptcha();
  }, [captcha]);

  return (
    <div>
      <canvas ref={canvasRef} width="250" height="50"></canvas>
      <input type="text" value={input} onChange={handleChange} width={50} />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default Captcha;