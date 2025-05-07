import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import parkingareaoff from "../../assets/images/parkingareaoff.png";
import parkingareaon from "../../assets/images/parkingareaon.png";
import Footer from "../../components/Footer";

function ParkingArea() {
  const [selectedArea, setSelectedArea] = useState(null);
  const areas = [1, 2, 3, 4];
  return (
    <div>
      <Navbar />
      <div className="mt-[100px] grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 justify-items-center">
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
      </div>
      <Footer/>
    </div>
  );
}

export default ParkingArea;
