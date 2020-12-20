import React, { Component } from 'react';
import abacus from '../images/abacus.png';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar fixed-bottom bg-info text-light">
                <button onClick={() => this.props.download()} className="btn btn-sm btn-secondary">Download json</button>
                <input onChange={(e) => this.props.upload(e)} className="btn btn-sm btn-info mx-auto" type="file" id="upload"/>
                <img src={abacus} width="30" height="30" className="text-center mx-auto" alt="abacus"/>    
            </nav>
        );
    }
}
 
export default Footer;