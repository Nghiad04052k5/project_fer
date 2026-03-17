import React, { useState, useMemo } from "react";

const Aggregator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 🔥 DATA TRỰC TIẾP TẠI ĐÂY
  const movies = [
    {
      id: 1,
      title: "Avengers",
      trailerUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
      genre: "Hành động, Viễn tưởng",
      posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
    },
    {
      id: 2,
      title: "Interstellar",
      trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
      genre: "Khoa học viễn tưởng",
      posterUrl: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
    },
    {
      id: 3,
      title: "The Conjuring",
      trailerUrl: "https://www.youtube.com/embed/k10ETZ41q5o",
      genre: "Kinh dị",
      posterUrl: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg"
    }
  ];

  // FILTER
  const filteredMovies = useMemo(() => {
    return movies.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h3
          style={{
            fontSize: "30px",
            color: "white",
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            textAlign: "center",
            width: "100%",
            marginTop: "-50px"
          }}
        >
          Phim đang chiếu
        </h3>
      </div>

      {/* MOVIE LIST */}
      <div className="flex gap-6 overflow-x-auto pb-4 justify-center" style={{ marginTop: "50px" }}>

        {filteredMovies.map((movie, index) => (
          <div
            key={movie.id}
            className="w-72 flex-shrink-0 transition duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden">

              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-96 object-cover"
              />

              <div className="absolute bottom-3 left-3 text-white">
                {index === 0 && (
                  <>
                    <p style={{ color: "yellow", fontSize: "22px", marginBottom: "200px" }}>
                      {movie.title}
                    </p>
                    <p>Avengers: Endgame – after Thanos’ snap...</p>
                  </>
                )}

                {index === 1 && (
                  <>
                    <p>THE END OF EARTH WILL NOT BE THE END OF US.</p>
                    <p>{movie.title}</p>
                  </>
                )}

                {index === 2 && (
                  <>
                    <p>{movie.title}</p>
                    <p>Paranormal investigators Ed and Lorraine Warren...</p>
                  </>
                )}
              </div>

              {/* PLAY */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMovie(movie);
                  }}
                  className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center"
                >
                  ▶
                </div>
              </div>

              <div className="absolute bottom-2 left-2 text-white text-3xl font-bold">
                {index + 1}
              </div>
            </div>

            <p className="mt-2 text-white">{movie.title}</p>
            <p className="text-gray-400">{movie.genre}</p>
          </div>
        ))}
      </div>

      {/* POPUP TRAILER */}
      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="relative w-[800px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✖
            </button>

            <iframe
              width="100%"
              height="450"
              src={`${selectedMovie.trailerUrl}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Aggregator;