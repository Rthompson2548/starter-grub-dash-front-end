import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Menu.css";

function Menu({ cartCount }) {
  const location = useLocation();

  const homeClass = location.pathname === "/" ? "nav-item active" : "nav-item";
  const dashboardClass = location.pathname.match(/^\/dashboard/i)
    ? "nav-item active"
    : "nav-item";

  return (
    <div className="bg-light">
      <nav className="container navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className={homeClass}>
              <Link className="nav-link" style={{ color: "black" }} to="/">
                <span className="oi oi-home" style={{fontSize: "50px"}} /> 
              </Link>
            </li>
            <li className={dashboardClass}>
              <Link className="nav-link" to="/dashboard">
              <span class="oi oi-dashboard" style={{fontSize: "50px", color: "black", marginTop: "5px"}}></span> 
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/orders/new">
                <span className="oi oi-cart" style={{fontSize: "50px", color: "black" }} />
               
                <span className="badge badge-pill badge-dark ml-1" style={{ backgroundColor: "black" }}>
                  {cartCount || 0}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
