import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const handleLogout = () => {
    // Xoá token / thông tin user (nếu có)
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    // Điều hướng về trang đăng nhập
    navigate("/");
  };
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to ="/home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to={"/profile"}
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh5xDDKe3VgR4z8agLx2LVl2H9vKgcCeEKKg&s"
                alt="user photo"
              />
            </Link>
            
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 !ml-[20px]"
            >
              Logout
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {[
                { to: "/home", label: "Home" },
                { to: "/livingroom", label: "Living room" },
                { to: "/bedroom", label: "Bedroom" },
                { to: "/kitchen", label: "Kitchen" },
                { to: "/parkingarea", label: "Parking area" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive(item.to)
                        ? "text-blue-700 font-semibold"
                        : "text-gray-900 dark:text-white"
                    } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:text-white md:dark:hover:text-blue-500`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
