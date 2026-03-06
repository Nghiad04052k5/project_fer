
import React from 'react';

export const SEAT_COLORS = {
  REGULAR: 'bg-slate-200 hover:bg-slate-300 border-slate-400',
  VIP: 'bg-amber-100 hover:bg-amber-200 border-amber-400',
  DOUBLE: 'bg-rose-100 hover:bg-rose-200 border-rose-400',
  BED: 'bg-indigo-100 hover:bg-indigo-200 border-indigo-400',
  BOOKED: 'bg-slate-700 cursor-not-allowed border-slate-900',
  SELECTED: 'bg-green-500 text-white border-green-600'
};

export const NAVIGATION = [
  { name: 'Khám phá', path: '/', icon: <i className="fas fa-compass"></i> },
  { name: 'Quản lý phim', path: '/movies', icon: <i className="fas fa-film"></i> },
  { name: 'Lịch chiếu', path: '/showtimes', icon: <i className="fas fa-calendar-alt"></i> },
  { name: 'Phòng & Ghế', path: '/rooms', icon: <i className="fas fa-door-open"></i> },
  { name: 'Khách hàng', path: '/customers', icon: <i className="fas fa-users"></i> },
  { name: 'Thống kê', path: '/stats', icon: <i className="fas fa-chart-line"></i> },
];
