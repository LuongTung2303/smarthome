import React, { useState } from "react";
function LightControl({ name, onImage, offImage }) {
  const [isOn, setIsOn] = useState(false);

  const toggleDevice = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div
      onClick={toggleDevice}
      className="w-32 cursor-pointer flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
    >
      <img src={isOn ? onImage : offImage} alt="Device" className="w-16 h-16" />
      <p className="mt-2 text-center text-sm font-medium">{name}</p>
    </div>
  );
}

export default LightControl;
