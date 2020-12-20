import React, { Component } from 'react';
import abacus from '../images/abacus.png';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar fixed-bottom bg-info text-light">
                <a className="btn mx-auto" onClick={() => document.getElementById("mySidenav").style.width = "250px"}>
                    <img src={abacus} width="30" height="30" className="text-center mx-2" alt="abacus"/>     
                </a>  
            </nav>
        );
    }
}
 
export default Footer;