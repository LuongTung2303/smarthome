import React from "react";
import { toggleLight } from "../services/apiFeeds";
function LightControl({ id, name, onImage, offImage, isOn, socket }) {
  // const toggleDevice = () => {
  //   const newState = !isOn;
  //   // Gửi yêu cầu bật/tắt thiết bị tới backend qua socket
  //   socket.emit("toggle_light", { id, state: newState });
  // };
  const handleClick = async () => {
    const newState = !isOn;
    const deviceName = `led${id}`; // tạo tên feed: led1, led2...
    try {
      await toggleLight(deviceName, newState);
    } catch (err) {
      alert("Lỗi khi gửi yêu cầu bật/tắt.");
    }
  };


  return (
    <div
      onClick={handleClick}
      className="w-32 cursor-pointer flex flex-col items-center p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
    >
      <img src={isOn ? onImage : offImage} alt="Device" className="w-16 h-16" />
      <p className="mt-2 text-center text-sm font-medium">{name}</p>
    </div>
  );
}

export default LightControl;