import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { NAVIGATION } from "../constants";
import ChatBox from "./ChatBox";
import AIIcon from "../AI.jpg";

// 🔥 DATA PHIM (bạn có thể import từ file khác)
const MOVIES = [
  { id: 1, title: "Avengers" },
  { id: 2, title: "Interstellar" },
  { id: 3, title: "The Conjuring" },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  // 🔥\ SEARCH STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSearch = () => {
    const found = MOVIES.find((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSelectedMovie(found || null);
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const role = user?.role === "admin" ? "admin" : "customer";
  const menu = NAVIGATION?.[role] || [];

  const notifications = [
    { id: 1, text: "Bạn đã đặt vé thành công 🎟" },
    { id: 2, text: "Phim mới vừa được thêm 🎬" },
    { id: 3, text: "Khuyến mãi 50% hôm nay 🔥" },
  ];

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const pending = bookings.filter((b) => b.status === "pending");
    setPendingCount(pending.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 🔥 FILTER PHIM
  const filteredMovies = useMemo(() => {
    return MOVIES.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/rap.jpg')" }}
    >
      {/* SIDEBAR */}
      {user && (
        <aside className="w-64 bg-slate-900 text-white fixed top-0 left-0 h-full flex flex-col z-50">
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              🎟
            </div>
            <span className="text-xl font-bold">CineMaster</span>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menu.map((item) => {
              const isActive = location.pathname.startsWith(item.path);

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
                  <span className="w-5 text-center">{item.icon}</span>
                  {item.name}

                  {item.path === "/admin-bookings" && pendingCount > 0 && (
                    <span className="ml-auto text-xs bg-red-500 px-2 py-0.5 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold">{user?.username}</p>
              <p className="text-xs text-slate-400">
                {user?.role === "admin" ? "Quản trị viên" : "Khách hàng"}
              </p>
            </div>
          </div>
        </aside>
      )}

      {/* MAIN */}
      <main className={`flex-1 ${user ? "ml-64" : ""}`}>
        {/* NAVBAR */}
        <div
          className={`fixed top-0 right-0 flex items-center justify-between px-6 border-b shadow-sm z-40
          ${user ? "left-64" : "left-0"}`}
          style={{
            background: "white",
            backdropFilter: "blur(10px)",
            height: "80px",
          }}
        >
          {/* LEFT */}
          <div className="flex items-center gap-6 w-full max-w-3xl">
            <h2
              style={{
                fontSize: "14px",
                fontWeight: "inherit",
                color: "red",
                lineHeight: "18px",
                marginLeft: "-10px",
              }}
            >
              Đặt vé <br />
              xem phim
            </h2>

            {/* SEARCH */}
<div className="relative flex-1">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setShowDropdown(true);
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    }}
    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
    placeholder="Bạn muốn xem phim gì hôm nay?"
    className="w-full pl-10 pr-4 py-2 bg-slate-100 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
  />

  {/* ICON SEARCH */}
  <span
    onClick={handleSearch}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
  >
    🔍
  </span>

  {/* DROPDOWN */}
  {showDropdown && searchQuery && (
    <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow mt-2 z-50">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onMouseDown={() => {
              setSearchQuery(movie.title);
              setSelectedMovie(movie);
              setShowDropdown(false);
            }}
            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
          >
            {movie.title}
          </div>
        ))
      ) : (
        <div className="p-2 text-gray-500 text-sm">
          Không tìm thấy
        </div>
      )}
    </div>
  )}
</div>
          </div>

          {/* RIGHT */}
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
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-20 p-8">
          <Outlet />
        </div>

        {/* CHAT */}
        {openChat && <ChatBox />}

        <button
          onClick={() => setOpenChat(!openChat)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50"
        >
          <img
            src={AIIcon}
            alt="AI Chat"
            className="w-full h-full rounded-full"
          />
        </button>
      </main>
    </div>
  );
};

export default Layout;