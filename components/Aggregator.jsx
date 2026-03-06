import React, { useState, useMemo } from "react";
import { INITIAL_MOVIES, INITIAL_SHOWTIMES, CINEMAS } from "../store/mockData";
import { CinemaChain } from "../types";

const Aggregator = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState("all");
  const [selectedChain, setSelectedChain] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = useMemo(() => {
    return INITIAL_MOVIES.filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredShowtimes = useMemo(() => {
    if (!selectedMovie) return [];

    return INITIAL_SHOWTIMES.filter((st) => {
      if (st.movieId !== selectedMovie.id) return false;

      const hour = new Date(st.startTime).getHours();
      let matchesTime = true;

      if (selectedTimeRange === "morning") matchesTime = hour >= 8 && hour < 12;
      else if (selectedTimeRange === "afternoon")
        matchesTime = hour >= 12 && hour < 18;
      else if (selectedTimeRange === "evening") matchesTime = hour >= 18;

      const cinema = CINEMAS.find((c) => c.id === st.cinemaId);
      const matchesChain =
        selectedChain === "all" || cinema?.chain === selectedChain;

      return matchesTime && matchesChain;
    }).sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }, [selectedMovie, selectedTimeRange, selectedChain]);

  const getChainLogoColor = (chain) => {
    const colors = {
      [CinemaChain.CGV]: "bg-rose-600",
      [CinemaChain.LOTTE]: "bg-red-700",
      [CinemaChain.STARLIGHT]: "bg-amber-500",
      [CinemaChain.DCINE]: "bg-indigo-600",
      [CinemaChain.BHD]: "bg-lime-600",
    };
    return colors[chain] || "bg-slate-500";
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Search Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 mb-2">
          Tìm phim, So giá rạp
        </h2>
        <p className="text-slate-500 mb-6">
          Hệ thống tổng hợp dữ liệu từ tất cả các rạp lớn trên toàn quốc
        </p>

        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
          <input
            type="text"
            placeholder="Bạn muốn xem phim gì hôm nay?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg transition-all"
          />
        </div>
      </div>

      {/* Movie Selection */}
      <section>
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-xl font-bold text-slate-800">Phim đang chiếu</h3>
          <span className="text-sm font-medium text-slate-400">
            {filteredMovies.length} phim khả dụng
          </span>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide px-2">
          {filteredMovies.map((movie) => (
            <button
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className={`flex-shrink-0 w-56 group transition-all duration-500 ${
                selectedMovie?.id === movie.id
                  ? "scale-105"
                  : "hover:-translate-y-2"
              }`}
            >
              <div
                className={`relative rounded-3xl overflow-hidden shadow-xl mb-3 ${
                  selectedMovie?.id === movie.id
                    ? "ring-4 ring-indigo-500 ring-offset-4"
                    : ""
                }`}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5 text-left">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">
                    {movie.genre}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                    {movie.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      {selectedMovie ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-8">
              <h3 className="font-bold text-slate-800 mb-6">Lọc kết quả</h3>

              <div className="space-y-6">
                {/* Time filter */}
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">
                    Theo khung giờ
                  </label>

                  <div className="space-y-2">
                    {[
                      { id: "all", label: "Tất cả suất chiếu" },
                      { id: "morning", label: "Buổi sáng (8h - 12h)" },
                      { id: "afternoon", label: "Buổi chiều (12h - 18h)" },
                      { id: "evening", label: "Buổi tối (Sau 18h)" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTimeRange(t.id)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium ${
                          selectedTimeRange === t.id
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-slate-600"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cinema chain */}
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">
                    Hệ thống rạp
                  </label>

                  <select
                    value={selectedChain}
                    onChange={(e) => setSelectedChain(e.target.value)}
                    className="w-full bg-slate-50 border px-4 py-3 rounded-xl text-sm"
                  >
                    <option value="all">Tất cả hệ thống</option>
                    {Object.values(CinemaChain).map((chain) => (
                      <option key={chain} value={chain}>
                        {chain}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Showtimes */}
          <div className="lg:col-span-9 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">
              Kết quả cho {selectedMovie.title}
            </h3>

            {filteredShowtimes.map((st) => {
              const cinema = CINEMAS.find((c) => c.id === st.cinemaId);
              const startTime = new Date(st.startTime);

              return (
                <div
                  key={st.id}
                  className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-8"
                >
                  <div
                    className={`w-20 h-20 rounded-2xl ${getChainLogoColor(
                      cinema?.chain
                    )} flex items-center justify-center text-white font-bold`}
                  >
                    {cinema?.chain}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-bold">{cinema?.name}</h4>
                    <p className="text-slate-400 text-sm">{cinema?.address}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-black">
                      {startTime
                        .getHours()
                        .toString()
                        .padStart(2, "0")}
                      :
                      {startTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}
                    </div>

                    <div className="text-xl text-emerald-600 font-bold">
                      {st.price.toLocaleString("vi-VN")}đ
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-indigo-600 p-16 rounded-3xl text-center text-white">
          <h3 className="text-3xl font-black">Bạn sẵn sàng xem phim chưa?</h3>
          <p className="text-indigo-100 mt-3">
            Chọn một bộ phim phía trên để xem suất chiếu từ tất cả các rạp.
          </p>
        </div>
      )}
    </div>
  );
};

export default Aggregator;