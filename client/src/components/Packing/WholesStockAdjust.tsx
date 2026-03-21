// BigTaihoStockAdjust.tsx

import { useEffect, useState } from "react";
import axios from "axios";

const WholesStockAdjust = () => {
  const [formData, setFormData] = useState<any>({});
  const [originalData, setOriginalData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch Taiho dummy lot data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/wholes/dummy-lot-data");
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
      await axios.put("/api/wholes/update-dummy-lot", formData);
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
    "issue_pw_150", "issue_w_150", "issue_ww_150", "issue_s_150", "issue_aw_150", "issue_lw_150",
        "issue_pw_180", "issue_w_180", "issue_ww_180", "issue_s_180", "issue_aw_180", "issue_lw_180",
        "issue_pw_210", "issue_w_210", "issue_ww_210", "issue_s_210", "issue_aw_210", "issue_lw_210",
        "issue_pw_240", "issue_w_240", "issue_ww_240", "issue_ww_240_A", "issue_aw_240", "issue_lw_240",
        "issue_pw_280", "issue_w_280", "issue_ww_280", "issue_ww_280_A", "issue_aw_280", "issue_lw_280",
        "wholes_double", "issue_pw_320", "issue_w_320", "issue_ww_320", "issue_ww_320_A", "issue_aw_320", "issue_lw_320",
        "issue_pw_360", "issue_w_360", "issue_ww_360", "issue_ww_360_A", "issue_aw_360", "issue_lw_360",
        "issue_pw_400", "issue_w_400", "issue_ww_400", "issue_ww_400_A", "issue_aw_400", "issue_lw_400",
        "issue_jjb", "issue_jjb1", "issue_payal_240", "issue_payal_400",
        "issue_e_320_lot", "issue_e_400_lot", "issue_in_w_240", "issue_in_w_320", "issue_in_w_400",
        "issue_a_150", "issue_c_150", "issue_e_150", "issue_sw_150", "issue_ssw_150", "issue_k_150",
        "issue_a_180", "issue_c_180", "issue_e_180", "issue_sw_180", "issue_ssw_180", "issue_k_180",
        "issue_a_210", "issue_c_210", "issue_e_210", "issue_sw_210", "issue_ssw_210", "issue_k_210",
        "issue_a_240", "issue_c_240", "issue_e_240", "issue_sw_240", "issue_ssw_240", "issue_k_240",
        "issue_a_280", "issue_c_280", "issue_e_280", "issue_sw_280", "issue_ssw_280", "issue_k_280",
        "issue_a_320", "issue_c_320", "issue_e_320", "issue_sw_320", "issue_ssw_320", "issue_k_320",
        "issue_a_360", "issue_c_360", "issue_e_360", "issue_sw_360", "issue_ssw_360", "issue_k_360",
        "issue_a_400", "issue_c_400", "issue_e_400", "issue_sw_400", "issue_ssw_400", "issue_k_400"
    
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

export default WholesStockAdjust;