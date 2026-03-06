import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Th 2', value: 4000 },
  { name: 'Th 3', value: 3000 },
  { name: 'Th 4', value: 2000 },
  { name: 'Th 5', value: 2780 },
  { name: 'Th 6', value: 1890 },
  { name: 'Th 7', value: 2390 },
  { name: 'CN', value: 3490 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Doanh thu ngày', value: '12.5Mđ', change: '+12%', icon: 'fa-dollar-sign', color: 'bg-emerald-500' },
          { label: 'Vé đã bán', value: '1,248', change: '+5.4%', icon: 'fa-ticket-alt', color: 'bg-indigo-500' },
          { label: 'Khách hàng mới', value: '45', change: '+2%', icon: 'fa-user-plus', color: 'bg-amber-500' },
          { label: 'Tỉ lệ lấp đầy', value: '78%', change: '+3.1%', icon: 'fa-percentage', color: 'bg-rose-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center`}>
                <i className={`fas ${stat.icon} text-lg`}></i>
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6">Doanh thu theo tuần</h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Movies */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6">Phim đang hot</h3>

          <div className="space-y-4">
            {[
              { title: 'Avengers: Endgame', category: 'Action', views: '12k views', progress: 85 },
              { title: 'Interstellar', category: 'Sci-Fi', views: '9k views', progress: 62 },
              { title: 'The Conjuring', category: 'Horror', views: '7.5k views', progress: 45 },
              { title: 'Spider-Man', category: 'Action', views: '6k views', progress: 30 },
            ].map((movie, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-16 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={`https://picsum.photos/seed/${movie.title}/100/150`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800">{movie.title}</h4>
                  <p className="text-xs text-slate-400">{movie.category} • {movie.views}</p>
                </div>

                <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full"
                    style={{ width: `${movie.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;