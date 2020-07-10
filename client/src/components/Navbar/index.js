import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Collapse } from '../Grid'

export default function NavBar() {

    let [navLinks, showNavLinks] = useState(false)
    const { pathname } = useLocation(),

     toggleNav = () => showNavLinks(navLinks = !navLinks)

    return (
        <nav className={'navbar navbar-expand-lg navbar-light bg-light'}
        style={{backgroundImage: 'linear-gradient(to right, white , #fcaf17)'}}
        >
            <Link to='/' className={'navbar-brand'}>Sapling Zone Clocks</Link>
            <button onClick={toggleNav} className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#target-collapse" >
            <span className="navbar-toggler-icon"></span>
            </button>
                
            <Collapse navState={navLinks} id={'target-collapse'}>
              <ul className="navbar-nav mr-auto">
                <li className={pathname === "/about" ? "nav-item active" : "nav-item"}>
                    <Link to="/about" className={'nav-link'}>
                        About This
                    </Link>    
                </li>
              </ul>
                    <img alt='logo' src={require("../../assets/img/sapling.png")} style={logo} />
            </Collapse>
        </nav>
    )
}

const logo = {
    float: 'right', 
    height:'65pt'
}