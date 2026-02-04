interface Props {
  title: string;
  value1: number|string;
  value2: number|string;
  value3: number|string;
  subtitle?: string;
  color?:string;
}

export const StatCard2 = ({ title, value1,value2, value3,subtitle,color}: Props) => {
  return (
    <div className={`rounded-2xl p-5 shadow-sm border border-gray-100 bg-purple-100`}>
      <p className={`text-2xl  font-semibold `}>{title}</p>

      <h2 className={color ?`mt-2 text-md font-semibold text-gray-500 `:
      'mt-2 text-md font-semibold text-gray-500'}>
        {value1.toLocaleString()}
      </h2>
      <h2 className={color ?`mt-2 text-md font-semibold text-gray-500`:
      'mt-2 text-md font-semibold text-gray-500'}>
        {value2.toLocaleString()}
      </h2>

      <h3 className={color ?`mt-2 text-md font-semibold text-${color}-500`:
      `mt-2 text-lg font-semibold `}>
        {value3.toLocaleString()}
      </h3>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-700">{subtitle}</p>
      )}
    </div>
  );
};
