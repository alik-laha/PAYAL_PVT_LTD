import React, { useState, useEffect } from 'react';
import './timepicker.css'


interface TimePickerProps {
  onChange: (time: string) => void;
  value: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ onChange, value }) => {
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');

  useEffect(() => {
    const [hrs, mins] = value.split(':').map(Number);
    if (hrs !== undefined && mins !== undefined) {
      if (hrs >= 12) {
        setHour((hrs > 12 ? hrs - 12 : 12).toString().padStart(2, '0'));
        setPeriod('PM');
      } else {
        setHour((hrs === 0 ? 12 : hrs).toString().padStart(2, '0'));
        setPeriod('AM');
      }
      setMinute(mins.toString().padStart(2, '0'));
    }
  }, [value]);

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(e.target.value);
    updateTime(e.target.value, minute, period);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinute(e.target.value);
    updateTime(hour, e.target.value, period);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
    updateTime(hour, minute, e.target.value);
  };

  const updateTime = (hrs: string, mins: string, prd: string) => {
    let hour24 = parseInt(hrs, 10);
    if (prd === 'PM' && hour24 < 12) {
      hour24 += 12;
    } else if (prd === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    const formattedTime = hour24.toString().padStart(2, '0')+':'+mins.padStart(2, '0');
    onChange(formattedTime);
  };

  return (
    <div className='time-picker'>
      <select className='bg-gray-100' value={hour} onChange={handleHourChange}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
            {(i + 1).toString().padStart(2, '0')}
          </option>
        ))}
      </select>
      :
      <select className='bg-gray-100' value={minute} onChange={handleMinuteChange}>
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={i.toString().padStart(2, '0')}>
            {i.toString().padStart(2, '0')}
          </option>
        ))}
      </select>
      <select  value={period} onChange={handlePeriodChange}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default TimePicker;