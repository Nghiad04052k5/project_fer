import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import MovieManagement from "./components/MovieManagement";
import RoomManagement from "./components/RoomManagement";
import Aggregator from "./components/Aggregator.jsx";

// Placeholder components
const Showtimes = () => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center py-20">
    <i className="fas fa-calendar-alt text-4xl text-slate-300 mb-4"></i>
    <h2 className="text-xl font-bold text-slate-800">Quản lý lịch chiếu theo rạp</h2>
    <p className="text-slate-500 mt-2">
      Đồng bộ lịch chiếu trực tiếp từ API các đối tác CGV, Lotte, Starlight.
    </p>
  </div>
);

const Customers = () => (
  <div className="space-y-4">
    <div className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Tìm tên, email hoặc SĐT..."
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none w-80"
        />
        <button className="bg-slate-800 text-white px-4 py-2 rounded-lg">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <p className="text-slate-500 text-sm">
        Hệ thống quản lý 1,204 khách hàng thành viên
      </p>
    </div>

    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Khách hàng
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Hệ thống rạp ưa thích
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Điểm tích lũy
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shadow-sm">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 block">
                      Nguyễn Văn A{i + 1}
                    </span>
                    <span className="text-xs text-slate-400">
                      customer{i}@cine.vn
                    </span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-rose-50 text-rose-600 text-[10px] font-black rounded uppercase">
                  CGV VIP
                </span>
              </td>

              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded">
                  {Math.floor(Math.random() * 500)} pts
                </span>
              </td>

              <td className="px-6 py-4 text-right">
                <button className="p-2 text-slate-400 hover:text-indigo-600">
                  <i className="fas fa-eye"></i>
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Aggregator />} />
          <Route path="/movies" element={<MovieManagement />} />
          <Route path="/showtimes" element={<Showtimes />} />
          <Route path="/rooms" element={<RoomManagement />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/stats" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;