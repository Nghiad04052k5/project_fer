import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const MovieDetail = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const movie = location.state?.movie;

  const showTimes = ["07:30", "12:00", "16:00", "20:00"];

  const rooms = [
    { id: 1, name: "P1 - IMAX" },
    { id: 2, name: "P2 - Gold Class" },
    { id: 3, name: "Cinema 1" },
    { id: 4, name: "Phòng 01" }
  ];

  const movieIndex = Number(id) || 0;

  const getRoomForShowtime = (timeIndex) => {
    const index = (movieIndex + timeIndex) % rooms.length;
    return rooms[index];
  };

  const handleSelectTime = (timeIndex) => {

    const room = getRoomForShowtime(timeIndex);

    navigate("/room", {
      state: {
        movie: movie?.title,
        room: room.name,
        time: showTimes[timeIndex]
      }
    });

  };

  return (

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        {movie?.title || "Chọn khung giờ chiếu"}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {showTimes.map((time, index) => {

          const room = getRoomForShowtime(index);

          return (

            <button
              key={index}
              onClick={() => handleSelectTime(index)}
              className="p-6 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >

              <div className="text-lg font-bold">
                {time}
              </div>

              <div className="text-xs mt-2 opacity-80">
                {room.name}
              </div>

            </button>

          );

        })}

      </div>

    </div>

  );

};

export default MovieDetail;