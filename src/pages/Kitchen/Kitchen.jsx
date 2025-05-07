import React from 'react'
import Navbar from '../../components/Navbar'
import TemperatureControl from '../../components/TemperatureControl'
import lightOff from "../../assets/images/LightOff.png";
import lightOn from "../../assets/images/lightOn.png";
import Footer from '../../components/Footer';
import LightControl from '../../components/LightControl';
function Kitchen() {
  const deviceLight = [
    { id: 1, name: "Device 1", onImage: lightOn, offImage: lightOff },
    { id: 2, name: "Device 2", onImage: lightOn, offImage: lightOff },
    { id: 3, name: "Device 3", onImage: lightOn, offImage: lightOff },
    { id: 4, name: "Device 4", onImage: lightOn, offImage: lightOff },
  ];
  return (
    <div>
      <Navbar/>
      <TemperatureControl/>
      <div className='my-[100px]'>
      <h2 className="px-20 font-bold text-2xl">Light Control</h2>
        <div className="flex flex-wrap gap-6 justify-center mt-10">
      {deviceLight.map((device) => (
        <LightControl
          key={device.id}
          name={device.name}
          onImage={device.onImage}
          offImage={device.offImage}
        />
      ))}
    </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Kitchen
