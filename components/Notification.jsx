import React, { useState } from "react";

const Notifications = () => {

  const [open, setOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Bạn đã đặt vé thành công 🎟" },
    { id: 2, text: "Phim mới vừa được thêm 🎬" },
    { id: 3, text: "Khuyến mãi 50% hôm nay 🔥" },
  ];

  return (
    <div className="relative">

      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 bg-white rounded-xl border flex items-center justify-center text-xl hover:bg-gray-100"
      >
        🔔
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border p-4 z-50">

          <h3 className="font-bold mb-3">Thông báo</h3>

          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">Không có thông báo</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="text-sm p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  {n.text}
                </li>
              ))}
            </ul>
          )}

        </div>
      )}

    </div>
  );
};

export default Notifications;