import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { NAVIGATION } from "../constants";

const Layout = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [pendingCount, setPendingCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role === "admin" ? "admin" : "customer";
  const menu = NAVIGATION[role] || [];

  useEffect(() => {

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const pending =
      bookings.filter((b) => b.status === "pending");

    setPendingCount(pending.length);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("user");
    navigate("/login");

  };

  const currentPage =
    menu.find((item) => location.pathname.startsWith(item.path))?.name ||
    "Trang chủ";

  return (

    <div className="flex min-h-screen bg-slate-50">

      {/* SIDEBAR */}
      {user && (
        <aside className="w-64 bg-slate-900 text-white fixed h-full flex flex-col">

          {/* Logo */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">

            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              🎟
            </div>

            <span className="text-xl font-bold">
              CineMaster
            </span>

          </div>

          {/* MENU */}
          <nav className="flex-1 p-4 space-y-2">

            {menu.map((item) => {

              const isActive =
                location.pathname.startsWith(item.path);

              return (

                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >

                  <span className="w-5 text-center">
                    {item.icon}
                  </span>

                  {item.name}

                  {/* admin notification */}
                  {item.path === "/admin-bookings" &&
                    pendingCount > 0 && (
                      <span className="ml-auto text-xs bg-red-500 px-2 py-0.5 rounded-full">
                        {pendingCount}
                      </span>
                  )}

                </Link>

              );

            })}

          </nav>

          {/* USER INFO */}
          <div className="p-6 border-t border-slate-800 flex items-center gap-3">

            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              👤
            </div>

            <div>

              <p className="text-sm font-semibold">
                {user?.username}
              </p>

              <p className="text-xs text-slate-400">
                {user?.role === "admin"
                  ? "Quản trị viên"
                  : "Khách hàng"}
              </p>

            </div>

          </div>

        </aside>
      )}

      {/* MAIN */}
      <main className={`flex-1 p-8 ${user ? "ml-64" : ""}`}>

        {/* HEADER */}
        <header className="mb-8 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            {currentPage}
          </h1>

          <div className="flex items-center gap-4">

            {!user ? (
              <>

                <Link
                  to="/login"
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Register
                </Link>

              </>
            ) : (
              <>

                {/* notification */}
                <button className="relative p-2 bg-white border rounded-lg">

                  🔔

                  {pendingCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                      {pendingCount}
                    </span>
                  )}

                </button>

                {/* admin add button */}
                {user.role === "admin" && (
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2">
                    ➕ Thêm mới
                  </button>
                )}

                {/* logout */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg"
                >
                  Logout
                </button>

              </>
            )}

          </div>

        </header>

        {/* PAGE CONTENT */}
        <Outlet />

      </main>

    </div>

  );

};

export default Layout;