import React, { useState, useEffect } from "react";

const AdminBookings = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  // duyệt vé
  const approve = (index) => {

    const updated = [...bookings];
    const booking = updated[index];

    updated[index] = {
      ...booking,
      status: "approved"
    };

    // =========================
    // LƯU GHẾ ĐÃ ĐẶT
    // =========================

    const key = `${booking.room}_${booking.time}`;

    const bookedSeats =
      JSON.parse(localStorage.getItem("bookedSeats")) || {};

    if (!bookedSeats[key]) {
      bookedSeats[key] = [];
    }

    bookedSeats[key] = [
      ...bookedSeats[key],
      ...booking.seats
    ];

    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

    // =========================
    // LƯU VÉ VÀO "VÉ CỦA TÔI"
    // =========================

    const myTickets =
      JSON.parse(localStorage.getItem("myTickets")) || [];

    const ticket = {
      user: booking.user,
      movie: booking.movie,
      room: booking.room,
      seats: booking.seats,
      time: booking.time,
      total: booking.total,
      status: "accepted"
    };

    myTickets.push(ticket);

    localStorage.setItem("myTickets", JSON.stringify(myTickets));

    // =========================

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));

    alert("Đã duyệt vé thành công!");

  };

  // xoá booking
  const deleteBooking = (index) => {

    const updated = bookings.filter((_, i) => i !== index);

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));

  };

  if (bookings.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        Chưa có yêu cầu đặt vé
      </div>
    );
  }

  return (

    <div className="p-10">

      <h2 className="text-2xl font-bold mb-6">
        Danh sách yêu cầu đặt vé
      </h2>

      {bookings.map((b, i) => (

        <div
          key={i}
          className="border p-5 mb-4 rounded-xl shadow-sm bg-white"
        >

          <p><b>Khách:</b> {b.user}</p>

          <p><b>Phim:</b> {b.movie}</p>

          <p>
            <b>Ghế:</b> {b.seats ? b.seats.join(", ") : "Không có"}
          </p>

          <p><b>Giờ chiếu:</b> {b.time}</p>

          <p>
            <b>Tổng tiền:</b> {b.total?.toLocaleString()} VND
          </p>

          {/* trạng thái */}
          <p className="mt-1">
            <b>Trạng thái:</b>{" "}
            {b.status === "approved" ? (
              <span className="text-green-600 font-semibold">
                Đã duyệt
              </span>
            ) : (
              <span className="text-yellow-600 font-semibold">
                Chờ duyệt
              </span>
            )}
          </p>

          <div className="flex gap-3 mt-4">

            {b.status === "pending" && (
              <button
                onClick={() => approve(i)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Duyệt vé
              </button>
            )}

            <button
              onClick={() => deleteBooking(i)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
            >
              🗑
            </button>

          </div>

        </div>

      ))}

    </div>

  );

};

export default AdminBookings;