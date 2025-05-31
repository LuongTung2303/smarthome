import React, {useState,useEffect} from "react";
import Navbar from "../../components/Navbar";
import LightControl from "../../components/LightControl";
import TemperatureControl from "../../components/TemperatureControl";
import Footer from "../../components/Footer";
import lightOff from "../../assets/images/LightOff.png";
import lightOn from "../../assets/images/lightOn.png";
import { toggleLight } from "../../services/apiFeeds";
import socket from "../../socket/socket";

function Kitchen() {
  const [lightStates, setLightStates] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const deviceLight = [
    { id: 1, name: "Device 1", onImage: lightOn, offImage: lightOff },
    { id: 2, name: "Device 2", onImage: lightOn, offImage: lightOff },
    { id: 3, name: "Device 3", onImage: lightOn, offImage: lightOff },
    { id: 4, name: "Device 4", onImage: lightOn, offImage: lightOff },
  ];

  const deviceMap = {
    2: 1, // button2 → led1
    3: 2, // button3 → led2
    4: 3, // button4 → led3
    5: 4, // button5 → led4
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Đã kết nối tới server");
      socket.emit("subscribe_feeds", ["button2", "button3", "button4", "button5"]);
    });

    socket.on("mqtt_message", (data) => {
      const { feed, data:value } = data;
      const buttonId = parseInt(feed.replace("button", ""));
      const deviceId = deviceMap[buttonId];

  
      if(deviceId) {
          setLightStates((prev) => ({
          ...prev,
          [deviceId]: value === "1",
        }));
      }
    });
  

    return () => {
      socket.disconnect();
    };
  }, []);

  // 👉 Handle toggle (click)
 const handleToggle = async (id) => {
  const newState = !lightStates[id];           // 1. Đảo trạng thái tạm thời
  const feedName = `led${id}`;

  // 2. Cập nhật ngay giao diện để có phản hồi
  setLightStates((prev) => ({
    ...prev,
    [id]: newState,
  }));

  try {
    await toggleLight(feedName, newState);     // 3. Gửi yêu cầu
  } catch (err) {
    // 4. Nếu lỗi → quay lại trạng thái cũ
    setLightStates((prev) => ({
      ...prev,
      [id]: !newState,
    }));
    alert("Lỗi khi gửi yêu cầu bật/tắt đèn.");
  }
};


  return (
    <div>
      <Navbar />
      <TemperatureControl />
      <div className="my-[100px]">
        <h2 className="px-20 font-bold text-2xl">Light Control</h2>
        <div className="flex flex-wrap gap-6 justify-center mt-10">
          {deviceLight.map((device) => (
            <LightControl
              key={device.id}
              id={device.id}
              name={device.name}
              onImage={device.onImage}
              offImage={device.offImage}
              isOn={lightStates[device.id]}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Kitchen
