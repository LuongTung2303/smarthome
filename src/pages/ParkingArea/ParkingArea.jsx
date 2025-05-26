import React, { useState,useEffect  } from "react";
import Navbar from "../../components/Navbar";
import parkingareaoff from "../../assets/images/parkingareaoff.png";
import parkingareaon from "../../assets/images/parkingareaon.png";
import Footer from "../../components/Footer";
import { io } from "socket.io-client";

function ParkingArea() {
  const socket = io("http://localhost:5000");
  const [selectedArea, setSelectedArea] = useState(null);
  const areas = [1, 2, 3, 4];
  const [areaStatus, setAreaStatus] = useState({
    area1: true,
    area2: true,
    area3: true,
    area4: true,
  });

  useEffect(() => {
    // Khi socket kết nối
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("subscribe_feeds", ["area1", "area2", "area3", "area4"]);
    });

    // Nhận dữ liệu từ server
    socket.on("mqtt_message", (data) => {
      console.log("Received:", data);
      const { feed, value } = data;

      setAreaStatus((prev) => ({
        ...prev,
        [feed]: value === "0", // 0 = có xe → true
      }));
    });

    // Cleanup khi component unmount
    return () => {
      socket.off("mqtt_message");
    };
  }, []);


  return (
    <div>
      <Navbar />
      {/* <div className="mt-[100px] grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 justify-items-center">
          {areas.map((area) => (
            <div
              key={area}
              onClick={() => setSelectedArea(area)}
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              <img
                src={selectedArea === area ? parkingareaoff : parkingareaon}
                alt={`Area ${area}`}
                width={250}
              />
              <p className="text-2xl">area {area}</p>
            </div>
          ))}
      </div> */}
       <div className="mt-[100px] grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 justify-items-center">
        {areas.map((area) => {
          const feedKey = `area${area}`;
          const hasCar = areaStatus[feedKey];

          return (
            <div key={area} style={{ textAlign: "center" }}>
              <img
                src={hasCar ? parkingareaon : parkingareaoff}
                alt={`Area ${area}`}
                width={250}
              />
              <p className="text-2xl">area {area}</p>
            </div>
          );
        })}
      </div>
      <Footer/>
    </div>
  );
}

export default ParkingArea;
