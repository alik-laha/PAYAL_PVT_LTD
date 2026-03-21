// BigTaihoStockAdjust.tsx

import { useEffect, useState } from "react";
import axios from "axios";

const VillageStockAdjust = () => {
  const [formData, setFormData] = useState<any>({});
  const [originalData, setOriginalData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch Taiho dummy lot data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/villageout/dummy-lot-data");
        setFormData(res.data.data || {});
        setOriginalData(res.data.data || {});
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle change
  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
  };

  // Submit update
  const handleSubmit = async () => {
    try {
      setSaving(true);
      await axios.put("/api/villageout/update-dummy-lot", formData);
      alert("✅ Updated successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    } finally {
      setSaving(false);
      window.location.reload();
    }
  };

  if (loading) return <div>Loading Taiho data...</div>;

  const fields = [
    "issue_packing"
  ];

  return (
    <div className="p-4 mt-4 border rounded bg-gray-50 shadow max-h-[500px] overflow-auto">

      {/* 3-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">

        {fields.map((key) => (
          <div key={key} className="flex items-center gap-2">

            {/* Label */}
            <div className="w-32 text-xs font-bold text-white rounded bg-gradient-to-r from-blue-500 to-red-500 text-center shadow-md h-7 items-center pt-1">
              {key.replace("issue_", "").replace(/_/g, " ").toUpperCase()}
            </div>

            {/* Input */}
            <input
              type="number"
              step="0.01"
              value={formData[key] ?? ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className={`flex-1 border p-1.5 rounded font-semibold border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-blue-400
                ${
                  Number(originalData[key]) !== Number(formData[key])
                    ? "bg-yellow-100 border-yellow-400"
                    : ""
                }`}
            />
          </div>
        ))}

      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-6 px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded shadow"
        >
          {saving ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default VillageStockAdjust;