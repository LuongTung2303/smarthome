import React, {useState,useEffect} from "react";
import Navbar from "../../components/Navbar";
import LightControl from "../../components/LightControl";
import TemperatureControl from "../../components/TemperatureControl";
import Footer from "../../components/Footer";
import lightOff from "../../assets/images/LightOff.png";
import lightOn from "../../assets/images/lightOn.png";
import { io } from "socket.io-client";
function LivingRoom() {
  const socket = io("http://localhost:5000");
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

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Đã kết nối tới server");
      socket.emit("subscribe_feeds", ["led1", "led2", "led3", "led4"]);
    });

    socket.on("mqtt_message", (data) => {
      const { feed, value } = data;
      const deviceId = parseInt(feed.replace("led", ""));
      setLightStates((prev) => ({
        ...prev,
        [deviceId]: value === "1",
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <TemperatureControl   socket={socket}/>
      <div className="my-[100px]">
        <h2 className="px-20 font-bold text-2xl">Light Control</h2>
        <div className="flex flex-wrap gap-6 justify-center mt-10">
          {/* {deviceLight.map((device) => (
            <LightControl
              key={device.id}
              name={device.name}
              onImage={device.onImage}
              offImage={device.offImage}
            />
          ))} */}

          {deviceLight.map((device) => (
            <LightControl
              key={device.id}
              id={device.id}
              name={device.name}
              onImage={device.onImage}
              offImage={device.offImage}
              socket={socket}
              isOn={lightStates[device.id]}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LivingRoom;
