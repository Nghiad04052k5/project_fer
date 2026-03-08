import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Aggregator from "./components/Aggregator";
import MovieManagement from "./components/MovieManagement";
import MovieDetail from "./components/MovieDetail";
import RoomManagement from "./components/RoomManagement";
import Dashboard from "./components/Dashboard";
import Invoice from "./components/Invoice";

import AdminBookings from "./components/AdminBookings";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import MyTickets from "./components/MyTickets";

/* Placeholder pages */

const Showtimes = () => (
  <div className="bg-white p-8 rounded-xl border text-center">
    <h2 className="text-xl font-bold">Quản lý lịch chiếu</h2>
  </div>
);

const Customers = () => (
  <div className="bg-white p-8 rounded-xl border text-center">
    <h2 className="text-xl font-bold">Quản lý khách hàng</h2>
  </div>
);

const Tickets = () => (
  <div className="bg-white p-8 rounded-xl border text-center">
    <h2 className="text-xl font-bold">Vé của tôi</h2>
  </div>
);

const Profile = () => (
  <div className="bg-white p-8 rounded-xl border text-center">
    <h2 className="text-xl font-bold">Thông tin tài khoản</h2>
  </div>
);

/* App */

const App = () => {
  return (
    <Router>

      <Routes>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout */}
        <Route path="/" element={<Layout />}>

          {/* Public */}
          <Route index element={<Aggregator />} />

           {/* Movie Detail (Customer click movie) */}
           <Route path="movies/:id" element={<MovieDetail />} />

          {/* Customer */}
          <Route path="tickets" element={<Tickets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="my-tickets" element={<MyTickets />} />

          {/* Admin */}
          <Route path="movies" element={<MovieManagement />} />
          <Route path="showtimes" element={<ProtectedRoute role="admin"><Showtimes /></ProtectedRoute>} />
          <Route path="room" element={<RoomManagement />} />
          <Route path="customers" element={<ProtectedRoute role="admin"><Customers /></ProtectedRoute>} />
          <Route path="stats" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
          <Route path="admin-bookings" element={ <ProtectedRoute role="admin"> <AdminBookings /> </ProtectedRoute>}/>
        </Route>

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </Router>
  );
};

export default App;