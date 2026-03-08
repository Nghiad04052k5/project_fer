import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PRICE = 80000;

const Invoice = () => {

  const location = useLocation();
  const data = location.state || {};

  const [sent, setSent] = useState(false);

  // user đang đăng nhập
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const user = currentUser.fullName || "Khách";

  const movie = data.movie || "Unknown";
  const room = data.room || "";
  const time = data.time || "";
  const seats = data.seats || [];

  const total = seats.length * PRICE;

  const sendBooking = () => {

    if (sent) return; // chống gửi 2 lần

    const booking = {
      user,
      movie,
      room,
      time,
      seats,
      total,
      status: "pending"
    };

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(booking);

    localStorage.setItem(
      "bookings",
      JSON.stringify(bookings)
    );

    setSent(true);

    alert("Yêu cầu đặt vé đã gửi tới Admin!");

  };

  return (

    <div className="p-10 max-w-lg mx-auto bg-white rounded-xl shadow">

      <h2 className="text-xl font-bold mb-6">
        Hóa đơn đặt vé
      </h2>

      <p><b>Tên khách:</b> {user}</p>
      <p><b>Phim:</b> {movie}</p>
      <p><b>Phòng:</b> {room}</p>
      <p><b>Khung giờ:</b> {time}</p>
      <p><b>Ghế:</b> {seats.join(", ")}</p>
      <p><b>Số lượng:</b> {seats.length}</p>
      <p><b>Thành tiền:</b> {total.toLocaleString()} VND</p>

      <button
        onClick={sendBooking}
        disabled={sent}
        className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl"
      >
        {sent ? "Đã gửi yêu cầu" : "Gửi yêu cầu đặt vé"}
      </button>

    </div>

  );

};

export default Invoice;