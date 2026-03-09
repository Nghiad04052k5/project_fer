import React, { useEffect, useState } from "react";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const myTickets = JSON.parse(localStorage.getItem("myTickets") || "[]");

    if (!user) return;

    const userName = user.fullName;

    const userTickets = myTickets.filter(
      (t) => t.user === userName
    );

    console.log("Filtered tickets:", userTickets);

    setTickets(userTickets);
  }, []);

  return (
    <div className="p-10 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Vé của tôi</h2>

      {tickets.length === 0 && (
        <div className="text-gray-500">
          Bạn chưa có vé nào được duyệt
        </div>
      )}

      {tickets.map((t, i) => (
        <div
          key={i}
          className="bg-white border rounded-xl p-5 shadow"
        >
          <p><b>Phim:</b> {t.movie}</p>
          <p><b>Phòng:</b> {t.room}</p>
          <p><b>Giờ:</b> {t.time}</p>
          <p><b>Ghế:</b> {t.seats?.join(", ")}</p>
          <p>
            <b>Tổng:</b> {t.total?.toLocaleString()} VND
          </p>

          <p className="text-green-600 font-semibold mt-2">
            Vé đã được duyệt
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;