import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light navbar-fixed-top" style={{backgroundColor: 'rgba(255, 255, 255)'}}>   
                <div className="container d-flex align-items-center justify-content-lg-between">

                    <a className="navbar-brand text-primary logo h1 align-self-center" href="/">
                        Prediction
                    </a>

                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between navbar-light" id="templatemo_main_nav">
                        <div className="flex-fill">
                            <ul className="nav navbar-nav text-white d-flex justify-content-between mx-lg-auto">
                                <li className="nav-item active">
                                    <Link class="nav-link" to="/regression">Regression</Link>
                                </li>
                                <li className="nav-item">
                                    <Link class="nav-link" to="/classification">Classification</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>
        );
    }
}

export default Menu;