import React, { useState } from "react";
import { INITIAL_MOVIES } from "../store/mockData";
import { generateMovieSummary } from "../services/geminiService";
import { useNavigate } from "react-router-dom";

const MovieManagement = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingMovie, setEditingMovie] = useState({});

  const handleAIHelp = async () => {

    if (!editingMovie.title || !editingMovie.genre) {
      alert("Vui lòng nhập tên phim và chọn thể loại trước.");
      return;
    }

    setIsGenerating(true);

    const summary = await generateMovieSummary(
      editingMovie.title,
      editingMovie.genre
    );

    setEditingMovie(prev => ({
      ...prev,
      description: summary
    }));

    setIsGenerating(false);

  };

  const handleSave = () => {

    if (editingMovie.id) {

      setMovies(prev =>
        prev.map(m => (m.id === editingMovie.id ? editingMovie : m))
      );

    } else {

      setMovies(prev => [
        ...prev,
        { ...editingMovie, id: `m${Date.now()}` }
      ]);

    }

    setIsModalOpen(false);
    setEditingMovie({});

  };

  const handleDelete = (id) => {

    const ok = window.confirm("Bạn có chắc muốn xóa phim này?");
    if (!ok) return;

    setMovies(prev => prev.filter(m => m.id !== id));

  };

  const handleViewShowtime = (movie) => {

    navigate(`/movies/${movie.id}`, {
      state: { movie }
    });

  };

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow border">

        <div className="relative w-72">

          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="pl-4 pr-4 py-2 w-full bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setEditingMovie({});
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            + Thêm phim
          </button>
        )}

      </div>

      {/* MOVIE LIST */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {movies.map(movie => (

          <div
            key={movie.id}
            className="bg-white rounded-xl shadow border overflow-hidden hover:shadow-lg transition"
          >

            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">

              <h3 className="text-lg font-bold mb-1">
                {movie.title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {movie.duration} phút
              </p>

              <p className="text-sm text-gray-600 line-clamp-2">
                {movie.description}
              </p>

              {!isAdmin && (
                <button
                  onClick={() => handleViewShowtime(movie)}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Xem lịch chiếu
                </button>
              )}

              {isAdmin && (
                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => {
                      setEditingMovie(movie);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 bg-yellow-400 text-white py-2 rounded-lg"
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                  >
                    Xóa
                  </button>

                </div>
              )}

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}

      {isAdmin && isModalOpen && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">
              {editingMovie.id ? "Cập nhật phim" : "Thêm phim"}
            </h2>

            <input
              type="text"
              placeholder="Tên phim"
              value={editingMovie.title || ""}
              onChange={e =>
                setEditingMovie({
                  ...editingMovie,
                  title: e.target.value
                })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="number"
              placeholder="Thời lượng"
              value={editingMovie.duration || ""}
              onChange={e =>
                setEditingMovie({
                  ...editingMovie,
                  duration: Number(e.target.value)
                })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <select
              value={editingMovie.genre || ""}
              onChange={e =>
                setEditingMovie({
                  ...editingMovie,
                  genre: e.target.value
                })
              }
              className="w-full border p-2 mb-3 rounded"
            >

              <option value="">Chọn thể loại</option>
              <option>Action</option>
              <option>Comedy</option>
              <option>Drama</option>
              <option>Horror</option>
              <option>Sci-Fi</option>

            </select>

            <textarea
              placeholder="Mô tả phim"
              value={editingMovie.description || ""}
              onChange={e =>
                setEditingMovie({
                  ...editingMovie,
                  description: e.target.value
                })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <button
              onClick={handleAIHelp}
              disabled={isGenerating}
              className="text-indigo-600 text-sm mb-3"
            >
              {isGenerating ? "AI đang tạo..." : "✨ Nhờ AI viết mô tả"}
            </button>

            <div className="flex gap-2">

              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Hủy
              </button>

              <button
                onClick={handleSave}
                className="flex-1 bg-indigo-600 text-white py-2 rounded"
              >
                Lưu
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default MovieManagement;