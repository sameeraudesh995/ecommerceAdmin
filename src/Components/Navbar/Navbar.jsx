import React from 'react'
import './Navbar.css'
import navProfile from '../../assets/nav-profile.svg'
import navlogo from '../../assets/nav-logo.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
    <img src={navlogo} alt="" className="nav-logo" />
    <img src={navProfile} className='nav-profile' alt="" />

    </div>
  )
}

export default Navbar