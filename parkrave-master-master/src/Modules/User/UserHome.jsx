import React from 'react'
import Navbar2 from './components3/Navbar2'
import UserBanner from './components3/UserBanner'
import Footer from './components3/Footer'
import HomeContents from './components3/HomeContents'
import SecuredParking from './components3/SecuredParking'
import WhyChooseUs from './components3/WhyChooseUs'

const UserHome = () => {
  return (
    <div>
        <Navbar2/>
        <UserBanner/>
        <HomeContents/>
        <WhyChooseUs/>
        <SecuredParking/>
        <Footer/>
    </div>
  )
}

export default UserHome