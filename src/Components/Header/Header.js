import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header(){
    return (
        <Link style={{textDecoration:"none"}}to='/'>
            <div className="header">
                <h1>CINEFLEX</h1>
            </div>        
        </Link>
    )
}
