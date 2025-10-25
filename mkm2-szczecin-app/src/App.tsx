import React from 'react';
import './App.css';
import Home from "./component/home/Home";

function App() {
    return (
        <div className="App">
            <nav className="navbar-header">
                <li className="navbar-header-item">Karta miejska</li>
                <li className="navbar-header-item city">Szczecin</li>
            </nav>
            <Home />
            <nav className="navbar-footer">
                <li className="navbar-footer-item">Home</li>
                <li className="navbar-footer-item">Bilety</li>
                <li className="navbar-footer-item">Wydarzenia</li>
                <li className="navbar-footer-item">Awarie</li>
                <li className="navbar-footer-item">Więcej</li>
            </nav>
        </div>
    );
}

export default App;
