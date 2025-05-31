import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import parkingareaoff from "../../assets/images/parkingareaoff.png";
import parkingareaon from "../../assets/images/parkingareaon.png";
import Footer from "../../components/Footer";
import socket from "../../socket/socket";

function ParkingArea() {
  const [slotStatus, setSlotStatus] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("subscribe_feeds", ["slot"]); // tên feed tùy vào server
    });

    socket.on("mqtt_message", (data) => {
      console.log("Received:", data);

      const { slot } = data;

      if (slot >= 1 && slot <= 4) {
        setSlotStatus((prev) => ({
          ...prev,
          [slot]: slot >= 10 ? true : false, // < 10 → false → parkingareaOff
        }));
      }
    });

    return () => {
      socket.off("mqtt_message");
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-[100px] grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 justify-items-center">
        {[1, 2, 3, 4].map((slot) => {
          const isActive = slotStatus[slot];

          return (
            <div key={slot} style={{ textAlign: "center" }}>
              <img
                src={isActive ? parkingareaon : parkingareaoff}
                alt={`Slot ${slot}`}
                width={250}
              />
              <p className="text-2xl">Slot {slot}</p>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default ParkingArea;
