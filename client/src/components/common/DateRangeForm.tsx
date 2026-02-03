import { useState } from "react";

interface Props {
  onSearch: (fromDate: string, toDate: string) => void;
}

export const DateRangeForm = ({ onSearch }: Props) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">From</label>
        <input
          type="date"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-500">To</label>
        <input
          type="date"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <button
        onClick={() => fromDate && toDate && onSearch(fromDate, toDate)}
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
};
