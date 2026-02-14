interface Props {
  title: string;
  value1?: number|string;
  value2?: number|string;
  value3?: number|string;
    value4?: number|string;
  value5?: number|string;
  value6?: number|string;
  value7?: number|string;
  subtitle?: string;
  color?:string;
}

export const StatCardBig = ({ title, value1,value2, value3,
    value4,value5, value6,value7,subtitle,color}: Props) => {
  return (
    <div className={color ?`rounded-2xl p-5 shadow-sm border border-gray-100 bg-${color}-100`:'rounded-2xl p-5 shadow-sm border border-gray-100 bg-yellow-50/80'}>
      <p className={`text-md font-semibold text-${color}-700`}>{title}</p>

      {value1 && <h2 className={color ?`mt-2 text-xl font-semibold text-${color}-500 `:
      'mt-2 text-xl font-semibold text-gray-500'}>
        {value1.toLocaleString()}
      </h2>}
      {value2 && <h2 className={color ?`mt-2 text-xl font-semibold text-${color}-500 `:
      'mt-2 text-xl font-semibold text-gray-500'}>
        {value2.toLocaleString()}
      </h2>}

      {value3 && <h2 className={color ?`mt-2 text-xl font-semibold text-${color}-500 `:
      'mt-2 text-xl font-semibold text-gray-500'}>
        {value3.toLocaleString()}
      </h2>}
       {value4 && <h2 className={color ?`mt-2 text-xl font-semibold text-${color}-500 `:
      'mt-2 text-xl font-semibold text-gray-500'}>
        {value4.toLocaleString()}
      </h2>}
       {value5 && <h2 className={color ?`mt-2 text-xl font-semibold text-${color}-500 `:
      'mt-2 text-xl font-semibold text-gray-500'}>
        {value5.toLocaleString()}
      </h2>}
       {value6 && <h2 className={color ?`mt-2 text-xl font-semibold text-${color}-500 `:
      'mt-2 text-xl font-semibold text-gray-500'}>
        {value6.toLocaleString()}
      </h2>}
       {value7 && <h2 className={color ?`mt-2 text-xl font-semibold text-${color}-500`:
      'mt-2 text-xl font-semibold text-gray-500'}>
        {value7.toLocaleString()}
      </h2>}

      {subtitle && (
        <p className="mt-1 text-xs text-gray-700">{subtitle}</p>
      )}
    </div>
  );
};
