import React from "react";
import { Link } from "react-router-dom";
import InputBar from "./InputBar";
import logo from "../assets/logo.png";
import doctorImage from "../assets/doctor1.jpg";

const AuthFormLayout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="topbar">
          <img src={logo} alt="logo" className="logo" />
        </div>
      </nav>

      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">{children}</div>

          <div className="carousel">
            <img src={doctorImage} className="image img-1 show" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFormLayout;
