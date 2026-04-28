import React from 'react'
import './Navbar.css'
import navProfile from '../../assets/user-setting.png'
import navlogo from '../../assets/nav-logo.svg'

const Navbar = () => {
  return (
    <div className="navbar">

      <div className="navbar-left">
        <img src={navlogo} alt="Logo" className="nav-logo" />
        <span className="nav-brand">Admin Panel</span>
      </div>

      <div className="navbar-right">
        <div className="nav-profile-wrapper">
          <img src={navProfile} className="nav-profile" alt="Profile" />
          <div className="nav-profile-info">
            <span className="nav-profile-name">Admin</span>
            <span className="nav-profile-role">Super Admin</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar