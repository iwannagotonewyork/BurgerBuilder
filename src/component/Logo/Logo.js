import React from 'react';
import './Logo.css';
import burgerLogo from '../../assets/Images/burger-logo.png';

function Logo(props) {
    return (
        <div className="Logo" style={{height: props.height}}>
            <img src={burgerLogo} alt="Burger Logo"/>
        </div>
    )
}

export default Logo;
