import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { RiNotification3Fill } from "react-icons/ri";
import ChatBot from "./ChatBot";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <header className="main_header">
            <div className="logo_container">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="headers_container" style={{ cursor: "pointer" }}>
              <Badge
                count={user && user.notifcation.length}
                onClick={() => {
                  navigate("/notification");
                }}
              >
                <RiNotification3Fill style={{ fontSize: "1.2rem" }} />
              </Badge>

              <Link to="/profile">
                <CgProfile style={{ fontSize: "3rem" }} />
              </Link>
            </div>
          </header>

          <div className="content">
            <div className="sidebar">
              <nav className="menu">
                {SidebarMenu.map((menu, index) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <div
                      className={`menu-item ${isActive && "active"}`}
                      key={index}
                    >
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  );
                })}
                <div className={`menu-item `} onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <Link to="/login">Logout</Link>
                </div>
              </nav>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
        <ChatBot />
      </div>
    </>
  );
};

export default Layout;
