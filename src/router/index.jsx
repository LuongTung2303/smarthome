import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import Register from '../pages/Register/Register'
import LivingRoom from '../pages/LivingRoom/LivingRoom'
import Kitchen from '../pages/Kitchen/Kitchen'
import ParkingArea from '../pages/ParkingArea/ParkingArea'
import Bedroom from '../pages/Bedroom/Bedroom'
import Profile from '../pages/Profile/Profile'
export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path = "/register" element ={<Register/>}/>
        <Route path='/kitchen' element= {<Kitchen/>}/>
        <Route path='/livingroom' element= {<LivingRoom/>}/>
        <Route path='/parkingarea' element = {<ParkingArea/>}/>
        <Route path='/bedroom' element = {<Bedroom/>}/>
        <Route path='/profile' element = {<Profile/>}/>
      </Routes>
    </Router>
  )
}
