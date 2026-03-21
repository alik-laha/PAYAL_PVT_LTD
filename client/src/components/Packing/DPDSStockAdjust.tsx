// DPDSStockAdjust.tsx

import { useEffect, useState } from "react";
import axios from "axios";

const DPDSStockAdjust = () => {
  const [formData, setFormData] = useState<any>({});
  const [originalData, setOriginalData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/dpds/dummy-lot-data");
        setFormData(res.data.data || {});
        setOriginalData(res.data.data || {}); // ✅ store original
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Change handler
  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
  };

  // Submit
  const handleSubmit = async () => {
    try {
      setSaving(true);
      await axios.put("/api/dpds/update-dummy-lot", formData);
      alert("✅ Updated successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading DPDS data...</div>;

  const fields = [
    "issue_m_ds","issue_m_dp","issue_k_dp","issue_ds_1","issue_ds_2",
    "issue_sp_2","issue_yjh","issue_yk","issue_kp","issue_wp",
    "issue_rs","issue_dp_2","issue_dp_3","issue_dp_4","issue_dp_3l",
    "issue_ss","issue_os","issue_os1","issue_V_ds","issue_V_m_ds",
    "issue_V_dp","issue_V_m_dp","issue_V_lp","issue_V_lp_2","issue_V_k_dp",
    "issue_V_ss","issue_V_yjh","issue_V_yk","issue_V_sp_2","issue_V_kp",
    "issue_V_dp_2","issue_V_dp_3","issue_V_dp_4","issue_V_os","issue_V_os_1",
    "issue_V_wp","issue_V_rs","issue_ext_grade_1","issue_ext_grade_2",
    "issue_ext_grade_3","issue_ext_grade_4","issue_ext_grade_5",
    "issue_ext_grade_6","issue_ext_grade_7","issue_ext_grade_8",
    "issue_ext_grade_9","issue_ext_grade_10"
  ];

  return (
    <div className="p-4 mt-4 border rounded bg-gray-50 shadow max-h-[500px] overflow-auto">

    

      {/* ✅ 3 column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">

        {fields.map((key) => (
          <div key={key} className="flex items-center gap-2">

            {/* Key */}
            <div className="w-32 text-xs font-bold text-gray-700 bg-purple-50 text-center shadow-md h-7 pt-1">
              {key.replace("issue_", "").replace(/_/g, " ").toUpperCase()}
            </div>

            {/* Value */}
            <input
              type="number"
              step="0.01"
              value={formData[key] ?? ""}
              onChange={(e) => handleChange(key, e.target.value)}
                className={`flex-1 border p-1.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-center
    ${originalData[key] !== formData[key] ? "bg-yellow-100" : ""}`}
              
            />
          </div>
        ))}

      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded shadow"
        >
          {saving ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default DPDSStockAdjust;