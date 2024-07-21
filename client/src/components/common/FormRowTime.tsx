import React from 'react';
import TimePicker from './TimePicker';
import { TableCell } from '../ui/table';



interface FormRowProps {
  idx: number;
  row: any; // Define a proper type for your row data
  column: string;
  handleRowChange: (idx: number, name: string, value: string) => void;
}

const FormRow: React.FC<FormRowProps> = ({ idx, row, column, handleRowChange }) => {
  const handleTimeChange = (time: string) => {
    handleRowChange(idx, column, time);
  };

  return (
    <TableCell>
      <TimePicker value={row[column]} onChange={handleTimeChange} />
    </TableCell>
  );
};

export default FormRow;