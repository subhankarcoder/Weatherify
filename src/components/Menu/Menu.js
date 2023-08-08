import React from 'react'
// import { Link } from 'react-router-dom';
import './Menu.css'
import DashImg from "../../Assets/Images/dashboard_white.png"
import MapImg from "../../Assets/Images/map_white.png"
import LogImg from "../../Assets/Images/settings_white.png"
import Logo from "../../Assets/Images/logo.png"

const Menu = () => {
  return (
    <div>
        <div className='menu'>
            <div className='menu-list'>
                <div className='logo'>
                    <img src={Logo} />
                </div>
                <div className='list'>
                    <ul>
                        <li>
                            <img src={DashImg} />
                            <a href="/dashboard">Dashboard</a>
                        </li>
                        <li>
                            <img src={MapImg} />
                            <a href="/map">Map</a>
                        </li>
                    </ul>
                </div>
                <div className='log-out'>
                    <img src={LogImg} />
                    <a href='#'>Log out</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Menu