import React from "react";
import Navbar from "../../components/Navbar";
import parkingareaoff from "../../assets/images/parkingareaoff.png";
import parkingareaon from "../../assets/images/parkingareaon.png";
import Footer from "../../components/Footer";
import { useSocket } from "../../socket/SocketContext";

function ParkingArea() {
  const { socketData } = useSocket();

  // Giả sử sensor3 là giá trị cảm biến cho bãi đỗ xe
  // Nếu data <= 10 thì slot có xe (true), > 10 thì không có xe (false)
  const data = Number(socketData["sensor3"]) || 100;
  const slotStatus = {
    1: data <= 10,
    2: data <= 10,
    3: data <= 10,
    4: data <= 10,
  };

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