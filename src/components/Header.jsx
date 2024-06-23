import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MENU_ITEMS } from "../components/constants";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#e4335a" : "#1F2937",
      borderRadius: isActive ? "0.25rem" : "0",
      padding: "5px 15px",
    };
  };

  return (
    <nav className="py-2 sticky top-0 backdrop-blur-md bg-[#ffffffa8] border-b border-border z-30">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex justify-between items-center">
          <div className=" flex items-center">
            <img src={logo} alt="logo" height={70} width={70} />
            <div >
              <div className="text-2xl font-bold text-center">Black Swan</div>
              <p className=" text-xs border-t-[#e4335a] border-t-2 p-1 tracking-[6px]">Engineering</p>
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:w-auto w-full">
            <div className="md:flex md:space-x-4">
              {MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.link}
                  className="block md:inline-block md:mr-4 text-gray-800 hover:text-gray-600"
                  style={navLinkStyles({
                    isActive: location.pathname === item.link,
                  })}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute left-0 top-15 backdrop-blur-md bg-white w-full p-4 shadow-lg md:hidden  ">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.link}
              className="block text-gray-800 hover:text-gray-600 py-2"
              style={navLinkStyles({ isActive: true })}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;
