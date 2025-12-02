import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Login from './Components/Login'
import Registration from './Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './Modules/Admin/AdminHome';
import Dashboard from './Modules/Admin/Components/Dashboard';
import Ownerhome from './Modules/Plot Owner/Ownerhome';
import dashboard from './Modules/Plot Owner/components1/PlotOwnerdashboard';
import UserHome from './Modules/User/UserHome';
import Navbar2 from './Modules/User/components3/Navbar2';
import AboutUs from './Modules/User/components3/AboutUs';
import BookSlots from './Modules/User/components3/BookSlots';
import ViewParkingSlots from './Modules/User/components3/ViewSlots';
import Bookings from './Modules/User/components3/Bookings';
import NearbyPumps from './Modules/User/components3/NearbyPumps';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Register' element={<Registration/>}/>
        <Route path='/AdminHome' element={<AdminHome/>}/>
        <Route path='/Ownerhome' element={<Ownerhome/>}/>
        <Route path='/UserHome' element={<UserHome/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/BookSlots' element={<BookSlots/>}/>
        <Route path='/ViewSlots' element={<ViewParkingSlots/>}/>
        <Route path='/Bookings' element={<Bookings/>}/>
        <Route path='/NearbyPumps' element={<NearbyPumps/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
