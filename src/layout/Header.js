import React from "react";
import headerImage from "./header.jpg";

const style = {
  background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${headerImage})`,
  backgroundPosition: "center",
  backgroundSize: "100% auto",
};

function Header() {
  return (
    <div className="jumbotron jumbotron-fluid text-white mb-0" style={style}>
      <div className="container">
        <h1 className="display-1 font-weight-bold">GrubDash</h1>
        <h3 className="lead font-weight-normal ml-2">
          Find the best restaurants near you
        </h3>
      </div>
    </div>
  );
}

export default Header;
