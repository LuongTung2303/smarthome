import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import LightControl from "../../components/LightControl";
import TemperatureControl from "../../components/TemperatureControl";
import Footer from "../../components/Footer";
import lightOff from "../../assets/images/LightOff.png";
import lightOn from "../../assets/images/lightOn.png";
import { toggleLight } from "../../services/apiFeeds";
import { useSocket } from "../../socket/SocketContext"; // Sử dụng context

function Kitchen() {
  const { socketData } = useSocket();

  const deviceLight = [
    { id: 1, name: "Device 1", onImage: lightOn, offImage: lightOff },
    { id: 2, name: "Device 2", onImage: lightOn, offImage: lightOff },
    { id: 3, name: "Device 3", onImage: lightOn, offImage: lightOff },
    { id: 4, name: "Device 4", onImage: lightOn, offImage: lightOff },
  ];

  // Map feed button -> device id
  const feedToDeviceId = {
    button2: 1,
    button3: 2,
    button4: 3,
    button5: 4,
  };

  // Lấy trạng thái đèn từ socketData
  const getLightStatesFromSocket = () => {
    const states = {};
    Object.entries(feedToDeviceId).forEach(([feed, id]) => {
      states[id] = socketData[feed] === "1";
    });
    return states;
  };

  // Trạng thái đèn để điều khiển giao diện (ưu tiên realtime từ socket)
  const [lightStates, setLightStates] = useState(getLightStatesFromSocket());

  // Cập nhật lightStates mỗi khi socketData thay đổi
  useEffect(() => {
    setLightStates(getLightStatesFromSocket());
    // eslint-disable-next-line
  }, [socketData]);

  // Xử lý bật/tắt đèn
  const handleToggle = async (id) => {
    const newState = !lightStates[id];
    const feedName = `led${id}`;

    // Cập nhật giao diện ngay lập tức
    setLightStates((prev) => ({
      ...prev,
      [id]: newState,
    }));

    try {
      await toggleLight(feedName, newState);
      // Sau khi gửi, trạng thái sẽ được cập nhật lại từ socketData khi có phản hồi từ server
    } catch (err) {
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

export default Kitchen;