import { useNavigate } from 'react-router-dom';
import { TokenUtils } from '../../utils/TokenUtils';
import React from 'react';

// Define the function component with the props
const NavigationBar: React.FC = () => {
    const navigate = useNavigate();


    const HandleNavigateCircleUpMain = () => {
        TokenUtils.Get();
        const destinationURL = `/circleup`;

        navigate(destinationURL);
      };

    return (

            <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top m-4">
                <div className="container">
                    <a className="navbar-brand" href="#home"><img src="./assets/images/Cobalt metaverse dark.png" height="32" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#contact">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>)
};

export default NavigationBar;