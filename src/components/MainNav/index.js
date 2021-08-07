import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from '../../store/AuthContext';
import { NavLink } from "react-router-dom";

import './index.scss';

// import { ReactComponent as Logo } from '../../assets/logo-screens.svg';
// import { ReactComponent as MenuIcon } from '../../assets/menu.svg';
// import { ReactComponent as FullLogo } from '../../assets/logo-screens-full.svg';

const MainNav = () => {

    const navBar = useRef(null);
    const offset = 90;

    const { doLogout } = useContext(AuthContext);

    // const location = useLocation();
    // const { pathname } = location;
    // const splitLocation = pathname.split("/");

    useEffect(() => {
        
        const handleScroll = () => {
            
            if (navBar.current) {
                const winOffset = window.scrollY;
                
                // Toggle Class
                navBar.current.classList[winOffset >= offset ? 'add' : 'remove']('nav-shrink');
            }
        }
        
        window.addEventListener("scroll", handleScroll);
        
        handleScroll();

    }, []);

    return (
        <>
        <nav ref={navBar} id="main-nav" className="navbar fixed-top navbar-expand navbar-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    {/* <FullLogo /> */}
                    <i className="mdi mdi-heart text-danger me-3"></i>
                    My Pressure
                </a>

                {/* <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" href="#mainNavOffcanvas" role="button" aria-controls="offcanvasExample">
                    <span className="menu-icon">
                        <MenuIcon/>
                    </span>
                </button> */}

    
                <ul className="navbar-nav ms-auto mb-0">
                    <li className="nav-item">
                            <NavLink activeClassName="active" exact className="nav-link px-3 px-md-4 text-center" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-link text-muted" onClick={() => doLogout()}><i className="mdi mdi-lock mdi-18px"></i></button>
                    </li>
                    {/*<li className="nav-item">
                        <NavLink activeClassName="active" exact className="nav-link px-3 px-md-4 text-center" to="/">Home</NavLink>
                    </li>
                        <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link px-3 px-md-4 text-center" to="/products">Products</NavLink>
                    </li>

                    <li className="nav-item dropdown">
                        <button className={`nav-link px-3 px-md-4 text-center btn btn-link dropdown-toggle ${splitLocation[1] === "solutions" ? "active" : ""} `} data-bs-toggle="dropdown" aria-expanded="false">Solutions</button>
                        <ul className="dropdown-menu border-0 p-3 shadow-lg" aria-labelledby="navbarDropdown">
                            <SolutionsNavItems
                                listClass="nav-item"
                                itemClass="nav-link px-3 px-md-4 text-center" />
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link px-3 px-md-4 text-center" to="/buy">Buy</NavLink>
                    </li>

                    <li className="nav-item">
                            <a className="nav-link px-3 px-md-4 text-center" target="_blank" rel="noreferrer" href="//templates.screens.my" >Templates <i className="mdi mdi-call-made"></i></a>
                    </li>
                    <li className="nav-item px-3">
                        <a className="btn btn-primary px-3 px-md-4 text-center" target="_blank" rel="noreferrer" href="//app.screens.my">Login</a>
                    </li> */}
                </ul>


            </div>
        </nav>

            {/* <div className="offcanvas offcanvas-start" tabIndex="-1" id="mainNavOffcanvas" aria-labelledby="mainNavOffcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="full-logo"><FullLogo /></h5>
                    <button type="button" className="btn-close text-reset px-4" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body small">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <NavLink activeClassName="active" exact className="" to="/">Home</NavLink>
                        </li>
                        <li className="list-group-item">
                            <NavLink activeClassName="active" className="" to="/products">Products</NavLink>
                        </li>
                        <li className="list-group-item">
                            <NavLink activeClassName="active" className="" to="/solutions">Solutions</NavLink>
                            <ul className="list-group list-group-flush border-top border-light">
                                <SolutionsNavItems 
                                    listClass="list-group-item" 
                                    itemClass="" />
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <NavLink activeClassName="active" className="" to="/buy">Buy</NavLink>
                        </li>
                        <li className="list-group-item">
                            <a className="nav-link " target="_blank" rel="noreferrer" href="//templates.screens.my" >Templates <i className="mdi mdi-call-made"></i></a>
                        </li>
                    </ul>
                    <div className="offcanvas-footer p-4">
                        <a className="btn btn-primary btn-lg px-4" target="_blank" rel="noreferrer" href="//app.screens.my">Login</a>
                    </div>
                </div>
            </div> */}

        </>
    );
}
 
export default MainNav;


// https://stackoverflow.com/questions/47879663/root-navlink-always-get-active-class-react-router-dom


/* const SolutionsNavItems = ({listClass, itemClass}) => {
    return (
        <>
            <li className={listClass}><NavLink activeClassName="active" className={itemClass} to="/solutions/covid19">Covid 19</NavLink></li>
            <li className={listClass}><NavLink activeClassName="active" className={itemClass} to="/solutions/retail">Retail</NavLink></li>
            <li className={listClass}><NavLink activeClassName="active" className={itemClass} to="/solutions/restaurants">Restaurants</NavLink></li>
            <li className={listClass}><NavLink activeClassName="active" className={itemClass} to="/solutions/hospitality">Hospitality</NavLink></li>
            <li className={listClass}><NavLink activeClassName="active" className={itemClass} to="/solutions/corporate">Corporate</NavLink></li>
            <li className={listClass}><NavLink activeClassName="active" className={itemClass} to="/solutions/healthcare">Healthcare</NavLink></li>
            <li className={listClass}><NavLink activeClassName="active" className={itemClass} to="/solutions/education">Education</NavLink></li>
        </>
    )
} */