import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '../constants';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-20">
        
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-ticket-alt text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">CineMaster</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="w-5 text-center">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">

            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <i className="fas fa-user-circle"></i>
            </div>

            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-slate-500">Quản trị viên</p>
            </div>

          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen bg-slate-50">

        <header className="mb-8 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-slate-800">
            {NAVIGATION.find(n => n.path === location.pathname)?.name || 'Trang chủ'}
          </h1>

          <div className="flex gap-4">

            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 relative">
              <i className="fas fa-bell"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>

            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center gap-2">
              <i className="fas fa-plus"></i>
              Thêm mới
            </button>

          </div>

        </header>

        {children}

      </main>

    </div>
  );
};

export default Layout;