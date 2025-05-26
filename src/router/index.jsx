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
import PrivateRoute from './PrivateRoute'
export default function AppRouter() {
  const protectedRoutes = [
    { path: '/home', element: <Home /> },
    { path: '/kitchen', element: <Kitchen /> },
    { path: '/livingroom', element: <LivingRoom /> },
    { path: '/parkingarea', element: <ParkingArea /> },
    { path: '/bedroom', element: <Bedroom /> },
    { path: '/profile', element: <Profile /> },
  ];
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path = "/register" element ={<Register/>}/>
          
        {protectedRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        ))}
      </Routes>
    </Router>
  )
}
