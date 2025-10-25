import { useState } from "react";

export default function TripDialog() {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    days: "",
    nights: "",
    transport: "",
    fuelType: "",
    mileage: "",
    splitOption: "No",
    noOfPeople: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex justify-center md:justify-end items-start md:items-start p-4 md:pr-30 md:pt-40">
      <div className="relative w-full max-w-md">

        {/* Dialog Box */}
        <div className="relative p-6 space-y-5 bg-white rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] 
                        transform transition-transform duration-300 hover:scale-105 hover:-rotate-1"  style={{ filter: "blur(4px)" }}>

          <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left tracking-wide">
            Trip Calculator 🧳
          </h2>

          {/* Source */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Source</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="Enter source city"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-200"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Enter destination city"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-200"
            />
          </div>

          {/* Days + Nights */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-700">Days</label>
              <input
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
                placeholder="No. of Days"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-200"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-700">Nights</label>
              <input
                type="number"
                name="nights"
                value={formData.nights}
                onChange={handleChange}
                placeholder="No. of Nights"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Mode of Transport */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Mode of Transport</label>
            <div className="flex flex-wrap gap-4">
              {["Flight", "Train", "Bus", "Personal"].map((mode) => (
                <label
                  key={mode}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-yellow-100 cursor-pointer transition-all duration-200"
                >
                  <input
                    type="radio"
                    name="transport"
                    value={mode}
                    checked={formData.transport === mode}
                    onChange={handleChange}
                    className="accent-yellow-400 w-4 h-4"
                  />
                  <span className="text-gray-800">{mode}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-gradient-to-r from-blue-800 to-blue-400 hover:from-blue-700 hover:to-blue-300 text-white font-bold py-2 rounded-2xl transition-transform duration-200 transform hover:scale-105">
            Calculate Trip 💰
          </button>
        </div>

        {/* Stylish Lock Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl shadow-lg">
              🔒
            </div>
            <span className="mt-2 text-gray-700 font-semibold">Coming Soon</span>
          </div>
        </div>

      </div>
    </div>
  );
}
