import { SectionType } from "@/type/type";


interface Props {
  section: SectionType;
  onChange: (s: SectionType) => void;
}

export const SectionTabs = ({ section, onChange }: Props) => {
  const tabs: SectionType[] = ["boiling", "scooping"];

  return (
    <div className="inline-flex rounded-xl bg-gray-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition
            ${
              section === tab
                ? "bg-white text-blue-600 shadow"
                : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
