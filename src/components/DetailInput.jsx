export default function DetailInput({ icon, label, value, onChange }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
        {icon}
        {label}
      </label>
      <input
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-2xl font-bold text-gray-900 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
      />
    </div>
  );
}