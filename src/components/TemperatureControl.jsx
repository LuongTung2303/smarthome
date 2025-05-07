import React, { useRef, useState, useEffect } from "react";
import summer from "../assets/images/summer.png";
import snowflake from "../assets/images/snowflake.png";
import fan from "../assets/images/fan.png";
import dry from "../assets/images/dry.png";
function TemperatureControl() {
  const [temperature, setTemperature] = useState(22);
  const [angle, setAngle] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const knobRef = useRef(null);
  const center = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const minTemp = 10;
  const maxTemp = 30;
  const [activeMode, setActiveMode] = useState(null);

  const modes = [
    { name: "snowflake", icon: snowflake },
    { name: "summer", icon: summer },
    { name: "dry", icon: dry },
    { name: "fan", icon: fan },
  ];

  const angleToTemperature = (angle) => {
    const normalized = (angle + 360) % 360;
    const temp = Math.round((normalized / 270) * (maxTemp - minTemp) + minTemp);
    return Math.max(minTemp, Math.min(maxTemp, temp));
  };

  const updateAngle = (e) => {
    const dx = e.clientX - center.current.x;
    const dy = e.clientY - center.current.y;
    const rad = Math.atan2(dy, dx);
    const deg = rad * (180 / Math.PI);
    const adjustedAngle = deg + 135;
    const clampedAngle = Math.max(0, Math.min(270, adjustedAngle));
    setAngle(clampedAngle);
    setTemperature(angleToTemperature(clampedAngle));
  };

  const handleMouseDown = (e) => {
    if (!isOn) return; // 🔒 Nếu OFF thì không làm gì
    const rect = knobRef.current.getBoundingClientRect();
    center.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    isDragging.current = true;
    updateAngle(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current && isOn) {
      updateAngle(e);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isOn]);

  return (
    <div className="mt-[50px]">
        <h2 className="px-20 font-bold text-2xl">Tempreature Control</h2>
      <div className="flex flex-col items-center mt-10 space-y-4">
        <div
          ref={knobRef}
          onMouseDown={handleMouseDown}
          className="relative w-64 h-64 rounded-full bg-gray-200 border-8 border-gray-300 transition-transform duration-200"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="absolute inset-10 rounded-full bg-red-100 flex flex-col items-center justify-center text-center">
            <span className="text-sm text-gray-700 font-semibold">
              {isOn ? "HEATING" : "OFF"}
            </span>
            <span className="text-2xl font-bold">{temperature}°C</span>
          </div>
          <div className="absolute w-4 h-4 bg-white rounded-full top-2 left-1/2 transform -translate-x-1/2" />
        </div>

        <p className="mt-4 text-xl">Nhiệt độ hiện tại: {temperature}°C</p>

        <div className="flex space-x-10 ">
          <button
            onClick={() => setIsOn(true)}
            className={`px-10 py-2 rounded ${
              isOn ? "bg-green-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            ON
          </button>
          <button
            onClick={() => setIsOn(false)}
            className={`px-10 py-2 rounded ${
              !isOn ? "bg-red-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            OFF
          </button>
        </div>
        <div>
          <h3 className="text-xl">Condition mode</h3>
          <div className="flex gap-5 mt-5">
            {modes.map((mode) => (
              <button
                key={mode.name}
                onClick={() => setActiveMode(mode.name)}
                className={`px-2 py-1 flex justify-center rounded-full w-20 h-8 transition-colors duration-200 ${
                  activeMode === mode.name ? "bg-blue-400" : "bg-[#F0DEEE]"
                }`}
              >
                <img
                  width={mode.name === "snowflake" ? 20 : 30}
                  src={mode.icon}
                  alt={mode.name}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemperatureControl;
