interface Props {
  title: string;
  value: number|string;
  subtitle?: string;
  color?:string
}

export const StatCard = ({ title, value, subtitle,color}: Props) => {
  return (
    <div className={`rounded-2xl bg-gray-100 p-5 shadow-sm border border-gray-100 bg-${color}-100`}>
      <p className="text-sm text-gray-500 font-semibold">{title}</p>

      <h2 className={`mt-2 text-3xl font-semibold text-${color}-800 `}>
        {value.toLocaleString()}
      </h2>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-700">{subtitle}</p>
      )}
    </div>
  );
};
