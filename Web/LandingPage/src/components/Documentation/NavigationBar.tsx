import { useNavigate } from 'react-router-dom';
import { TokenUtils } from '../../utils/TokenUtils';
import React from 'react';

// Define the function component with the props
const NavigationBar: React.FC = () => {
    return (

            <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top m-0">
                <div className="container">
                    <a className="navbar-brand" href="/"><img src="./assets/images/Cobalt metaverse dark.png" height="32" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>)
};

export default NavigationBar;