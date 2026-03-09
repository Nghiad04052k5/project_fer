/* ================================
   Seat Colors
================================ */

export const SEAT_COLORS = {
  REGULAR: "bg-slate-200 hover:bg-slate-300 border-slate-400",
  VIP: "bg-amber-100 hover:bg-amber-200 border-amber-400",
  DOUBLE: "bg-rose-100 hover:bg-rose-200 border-rose-400",
  BED: "bg-indigo-100 hover:bg-indigo-200 border-indigo-400",
  BOOKED: "bg-slate-700 cursor-not-allowed border-slate-900",
  SELECTED: "bg-green-500 text-white border-green-600",
};


/* ================================
   Navigation
================================ */

export const NAVIGATION = {

  /* ===== Customer ===== */

  customer: [
    {
      name: "Khám phá",
      path: "/",
      icon: "🧭",
    },
    {
      name: "Phim",
      path: "/movies",
      icon: "🎬",
    },
    {
      name: "Lịch chiếu",
      path: "/showtimes",
      icon: "📅",
    },
    {
      name: "Vé của tôi",
      path: "/my-tickets",
      icon: "🎟",
    },
    {
      name: "Tài khoản",
      path: "/profile",
      icon: "👤",
    }
  ],

  /* ===== Admin ===== */

  admin: [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "📊",
    },
    {
      name: "Quản lý phim",
      path: "/movies",
      icon: "🎬",
    },
    {
      name: "Lịch chiếu",
      path: "/showtimes",
      icon: "📅",
    },
    {
      name: "Phòng & Ghế",
      path: "/room",
      icon: "🚪",
    },
    {
      name: "Khách hàng",
      path: "/customers",
      icon: "👥",
    },
    {
      name: "Thống kê",
      path: "/stats",
      icon: "📈",
    },
    {
      name: "Đặt vé",
      path: "/admin-bookings",
      icon: "🎟",
    },
  ],

};