import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Collapse, Button } from '../Grid'

export default function NavBar() {

    const [ navLinks, showNavLinks ] = useState(false),
     { pathname } = useLocation(),

     toggleNav = () => showNavLinks(!navLinks);

    return (
        <nav className={'navbar navbar-expand-lg navbar-light bg-light'}
        style={{backgroundImage: 'linear-gradient(to right, white , #fcaf17)'}}
        >
            <Link to='/' className={'navbar-brand'}>Sapling Zone Clocks</Link>
            <Button onClick={toggleNav} className={'navbar-toggler'} type="button" data-toggle="collapse" data-target="#target-collapse" >
                <span className="navbar-toggler-icon"></span>
            </Button>
                
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