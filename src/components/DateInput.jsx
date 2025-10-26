export default function DateInput({ icon, label, value, onChange, min }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
        {icon}
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        className="w-full text-xl font-bold text-gray-900 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
      />
    </div>
  );
}
