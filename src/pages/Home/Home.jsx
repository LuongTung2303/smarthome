import React, { useState,useEffect } from "react";
import Navbar from "../../components/Navbar";
import room from "../../assets/images/room.jpg";
import Footer from "../../components/Footer";
import hot from '../../assets/images/hot.png';
import flash from '../../assets/images/flash.png';
import summer from '../../assets/images/summer.png'
import socket from "../../socket/socket";
function Home() {
  const [humidity,setHumidity] = useState(0);
  const [temperature,setTemperature] = useState(0);
  const Card = ({ image, title, description }) => {
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => setIsOn(!isOn);
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-64">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="flex items-center justify-between gap-2">
          <span className="text-sm">{isOn ? 'On' : 'Off'}</span>
          <button
            onClick={toggleSwitch}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              isOn ? 'bg-pink-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ${
                isOn ? 'translate-x-6 bg-fuchsia-500' : ''
              }`}
            />
          </button>
        </div>
        </div>
      </div>
    );
  };
  const cards = [
    {
      image: room,
      title: "Living room",
      description: "15 devices",
    },
    {
      image: room,
      title: "Bedroom",
      description: "15 devices",
    },
    {
      image: room,
      title: "Kitchen",
      description: "15 devices",
    },
    {
      image: room,
      title: "Parking area",
      description: "15 devices",
    },
  ];

   useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Đã kết nối tới server");
      socket.emit("subscribe_feeds",["sensor1","sensor2"] );
    });
    socket.onAny((event,data) =>{console.log(event,data)});
    socket.on("mqtt_message", (data) => {
       console.log(data);
      const { feed, data:value } = data;
      if (feed =="sensor2") {
        setHumidity(value);
      }
      if (feed =="sensor1") {
        setTemperature(value);
      }
    });


    return () => {
      socket.disconnect();
    };
  }, []);
 
  return (
    <div>
      <Navbar />
      <div className="mt-[50px] flex justify-center">
        <div className="p-2 rounded-md flex justify-center gap-[8rem] bg-[#D9D9D9]">
          <div className="infor flex gap-1">
            <div className="imgIcon flex items-center">
              <img width={80}  src={summer} alt="" />
            </div>
            <div className="infor_content flex flex-col justify-center">
              <p>Humidity</p>
              <p>{humidity}</p>
            </div>
          </div>
          <div className="infor flex items-center">
            <div className="imgIcon">
            <img width={80}  src={flash} alt="" />
            </div>
            <div className="infor_content flex flex-col justify-center">
              <p>Energy</p>
              <p>60Kwh</p>
            </div>
          </div>
          <div className="infor flex items-center">
            <div className="imgIcon">
            <img width={80}  src={hot} alt="" />
            </div>
            <div className="infor_content flex flex-col justify-center">
              <p>Temp</p>
              <p>{temperature}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[100px] grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 justify-items-center">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
