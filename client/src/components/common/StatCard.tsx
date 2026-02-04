interface Props {
  title: string;
  value: number|string;
  subtitle?: string;
  color?:string;
}

export const StatCard = ({ title, value, subtitle,color}: Props) => {
  return (
    <div className={color ?`rounded-2xl p-5 shadow-sm border border-gray-100 bg-${color}-100`:
    'rounded-2xl p-5 shadow-sm border border-gray-100 bg-yellow-50/80'}>
      <p className={`text-md text-${color}-500 font-semibold `}>{title}</p>

      <h2 className={color ?`mt-2 text-2xl font-semibold text-${color}-500 `:
      'mt-2 text-2xl font-semibold text-gray-500'}>
        {value.toLocaleString()}
      </h2>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-700">{subtitle}</p>
      )}
    </div>
  );
};
