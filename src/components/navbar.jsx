import React, { Component } from 'react';

const NavBar = () => {
  return (
    <React.Fragment>
      <div id="header" className="border-highlight bg-light">
        <nav className="container navbar">
          <a href="index.html" className="nav-brand text-dark">
            lumin
          </a>

          {/* collapse on toggle button  */}
          <div className="collapse">
            <ul className="navbar-nav">
              <a href="#" className="nav-link">
                Shop
              </a>
              <a href="#" className="nav-link">
                Lawn
              </a>
            </ul>
          </div>

          {/* toggle button  */}
          <button className="toggle-button">
            <span>
              <i className="fas fa-bars"></i>
            </span>
          </button>

          {/* Cart info */}
          <ul className="navbar-cart">
            <a href="#" className="nav-link">
              Account
            </a>
            <a href="#" className="nav-link">
              <i className="fa fa-shopping-cart"></i>
            </a>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
