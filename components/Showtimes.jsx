import React from "react";

const Showtimes = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const showtimes = [
    {
      movie: "Avengers: Endgame",
      room: "P1",
      times: ["10:00", "13:30", "19:00"]
    },
    {
      movie: "The Conjuring",
      room: "P2",
      times: ["11:00", "15:00", "21:00"]
    }
  ];

  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold mb-6">
        {isAdmin ? "Quản lý lịch chiếu" : "Lịch chiếu phim"}
      </h2>

      {showtimes.map((s, i) => (
        <div
          key={i}
          className="bg-white p-6 mb-4 rounded-xl shadow border"
        >
          <h3 className="font-semibold text-lg">
            {s.movie}
          </h3>

          <p>Phòng: {s.room}</p>

          <div className="flex gap-3 mt-3 flex-wrap">
            {s.times.map((t, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                {t}
              </button>
            ))}
          </div>

          {isAdmin && (
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded">
                Sửa
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded">
                Xóa
              </button>
            </div>
          )}

        </div>
      ))}

    </div>
  );
};

export default Showtimes;