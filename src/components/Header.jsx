import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import classNames from "classnames";

const NavItem = ({ children, to, ...props }) => {
  const location = useLocation();

  return (
    <NavLink
      to={to}
      className={classNames(
        {
          "text-black": location.pathname === to,
          "text-slate-500": location.pathname !== to,
        },
        "hover:text-black",
      )}
      {...props}
    >
      <p>{children}</p>
    </NavLink>
  );
};

const ExitAdmin = ({ onClick }) => {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && (
        <NavLink
          className="text-red-500 hover:text-red-700"
          onClick={onClick}
          to="/admin"
        >
          Exit Admin
        </NavLink>
      )}
    </>
  );
};

const Header = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const navigate = useNavigate();

  const toggleHamburger = () => {
    setOpenHamburger((current) => !current);
  };

  const handleClickExit = () => {
    localStorage.setItem("token", "");
  };

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <header>
      <div className="mx-3 my-3 flex h-16 rounded bg-slate-100 px-5 shadow md:px-[5%] lg:mx-5 lg:px-[15%]">
        <div className="flex items-center lg:hidden">
          <RxHamburgerMenu
            onClick={toggleHamburger}
            className="cursor-pointer"
            size={48}
          />
        </div>
        <div className="flex w-full items-center justify-end text-nowrap lg:w-min lg:justify-center">
          <span className="cursor-pointer" onClick={handleClickLogo}>
            <h1>Ticket App</h1>
          </span>
        </div>
        <nav className="hidden w-full items-center justify-end lg:flex">
          <ul className="flex items-center gap-3">
            <NavItem to="/basvuru-olustur">Create Application</NavItem>
            <NavItem to="/basvuru-sorgula">Check Application</NavItem>
            <NavItem to="/admin">Admin</NavItem>
            <ExitAdmin onClick={handleClickExit} />
          </ul>
        </nav>
      </div>
      <nav
        className={`fixed rounded-b ${
          openHamburger ? "-left-0" : "-left-[100%]"
        } top-0 z-40 h-full w-2/3 bg-slate-100 shadow duration-500 ease-in-out md:w-1/3`}
      >
        <div className="flex w-full justify-end p-4">
          <IoMdClose
            onClick={toggleHamburger}
            className="cursor-pointer"
            size={48}
          />
        </div>
        <ul className="flex w-full flex-col items-center justify-center gap-3">
          <NavItem onClick={toggleHamburger} to="/basvuru-olustur">
            Create Application
          </NavItem>
          <NavItem onClick={toggleHamburger} to="/basvuru-sorgula">
            Check Application
          </NavItem>
          <NavItem onClick={toggleHamburger} to="/admin">
            Admin
          </NavItem>
          <ExitAdmin
            onClick={() => {
              handleClickExit();
              toggleHamburger();
            }}
          />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
