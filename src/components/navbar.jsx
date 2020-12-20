import React, { Component } from 'react';
import abacus from '../images/abacus.png';

class NavBar extends Component {
    render() { 
        return ( 
            <nav className="navbar bg-info">
                <h2 className="mx-auto title-font">
                    Grade
                    <a className="btn" onClick={() => document.getElementById("mySidenav").style.width = "250px"}>
                       <img src={abacus} width="30" height="30" className="text-center mx-2" alt="abacus"/>     
                    </a>
                    
                    Calculator
                </h2>
            </nav>
         );
    }
}
 
export default NavBar;