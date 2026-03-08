import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { INITIAL_ROOMS } from "../store/mockData";
import { SEAT_COLORS } from "../constants";
import { SeatType } from "../types";

const RoomManagement = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // dữ liệu từ MovieDetail
  const movieName = location.state?.movie || "Unknown Movie";
  const showTime = location.state?.time || "Unknown Time";
  const roomFromDetail = location.state?.room || INITIAL_ROOMS[0].name;

  const [rooms] = useState(INITIAL_ROOMS);

  const defaultRoom =
    INITIAL_ROOMS.find((r) => r.name === roomFromDetail) || INITIAL_ROOMS[0];

  const [selectedRoom, setSelectedRoom] = useState(defaultRoom);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // đọc ghế đã được duyệt
  const key = `${selectedRoom.name}_${showTime}`;

  const bookedSeatsData =
    JSON.parse(localStorage.getItem("bookedSeats")) || {};

  const bookedSeats = bookedSeatsData[key] || [];

  const getSeatType = (rowIdx, totalRows) => {

    if (rowIdx === totalRows - 1) return SeatType.BED;
    if (rowIdx === totalRows - 2) return SeatType.DOUBLE;
    if (rowIdx < 3) return SeatType.REGULAR;

    return SeatType.VIP;

  };

  const toggleSeat = (seatId) => {

    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }

  };

  const confirmBooking = () => {

    if (selectedSeats.length === 0) {
      alert("Bạn chưa chọn ghế!");
      return;
    }

    const ok = window.confirm(
      `Bạn chắc chắn đặt ghế: ${selectedSeats.join(", ")} ?`
    );

    if (!ok) return;

    const user =
      JSON.parse(localStorage.getItem("user"))?.fullName || "Guest";

    const booking = {
      user: user,
      movie: movieName,
      room: selectedRoom.name,
      time: showTime,
      seats: selectedSeats,
      total: selectedSeats.length * 80000,
      status: "pending"
    };

    // chỉ chuyển sang invoice
    navigate("/invoice", {
      state: booking
    });

  };

  const totalSeats = selectedRoom.rows * selectedRoom.cols;
  const availableSeats = totalSeats - bookedSeats.length;

  return (

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 p-6">

      {/* ROOM LIST */}

      <div className="xl:col-span-1 space-y-4">

        <h2 className="text-xl font-bold">
          Danh sách phòng
        </h2>

        {rooms.map((room) => (

          <button
            key={room.id}
            onClick={() => {
              setSelectedRoom(room);
              setSelectedSeats([]);
            }}
            className={`w-full text-left p-6 rounded-xl border ${
              selectedRoom.id === room.id
                ? "bg-indigo-600 text-white"
                : "bg-white"
            }`}
          >

            <h3 className="font-bold text-lg">
              {room.name}
            </h3>

            <p className="text-sm">
              {room.rows} x {room.cols} ghế
            </p>

          </button>

        ))}

      </div>

      {/* SEAT MAP */}

      <div className="xl:col-span-2 bg-white p-8 rounded-2xl shadow border flex flex-col items-center">

        <h2 className="text-xl font-bold mb-2">
          {selectedRoom.name}
        </h2>

        <p className="text-sm text-gray-500 mb-2">
          Phim: {movieName}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Khung giờ: {showTime}
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Ghế trống: {availableSeats} / {totalSeats}
        </p>

        {/* SCREEN */}

        <div className="mb-10 w-full max-w-md">

          <div className="h-2 bg-gray-300 rounded-full mb-2"></div>

          <p className="text-center text-xs text-gray-400 uppercase">
            Screen
          </p>

        </div>

        {/* SEATS */}

        <div className="space-y-2">

          {Array.from({ length: selectedRoom.rows }).map((_, rIdx) => (

            <div key={rIdx} className="flex gap-2 items-center">

              <span className="w-6 text-xs font-bold text-gray-400">
                {String.fromCharCode(65 + rIdx)}
              </span>

              {Array.from({ length: selectedRoom.cols }).map((_, cIdx) => {

                const seatId =
                  `${String.fromCharCode(65 + rIdx)}${cIdx + 1}`;

                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                const sType = getSeatType(rIdx, selectedRoom.rows);

                let colorClass = SEAT_COLORS.REGULAR;

                if (sType === SeatType.VIP)
                  colorClass = SEAT_COLORS.VIP;

                if (sType === SeatType.DOUBLE)
                  colorClass = SEAT_COLORS.DOUBLE;

                if (sType === SeatType.BED)
                  colorClass = SEAT_COLORS.BED;

                if (isBooked)
                  colorClass = SEAT_COLORS.BOOKED;

                if (isSelected)
                  colorClass = "bg-green-400 border-green-600 text-white";

                return (

                  <div
                    key={cIdx}
                    onClick={() => toggleSeat(seatId)}
                    className={`w-8 h-8 rounded-md border-b-4 flex items-center justify-center text-[10px] font-bold ${
                      isBooked ? "cursor-not-allowed" : "cursor-pointer"
                    } ${colorClass}`}
                  >
                    {cIdx + 1}
                  </div>

                );

              })}

            </div>

          ))}

        </div>

        <div className="mt-6 text-sm">
          Ghế đã chọn: {selectedSeats.join(", ") || "Chưa chọn"}
        </div>

        <button
          onClick={confirmBooking}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Đặt vé
        </button>

      </div>

    </div>

  );

};

export default RoomManagement;