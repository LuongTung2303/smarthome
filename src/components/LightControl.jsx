import React from "react";

function LightControl({ id, name, onImage, offImage, isOn, onToggle }) {
  return (
    <div
      onClick={() => onToggle(id)}
      className="w-32 cursor-pointer flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
    >
      <img src={isOn ? onImage : offImage} alt="Device" className="w-16 h-16" />
      <p className="mt-2 text-center text-sm font-medium">{name}</p>
    </div>
  );
}

export default LightControl;
