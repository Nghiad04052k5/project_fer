import React, { useState } from 'react';
import { INITIAL_MOVIES } from '../store/mockData';
import { generateMovieSummary } from '../services/geminiService';

const MovieManagement = () => {
  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingMovie, setEditingMovie] = useState({});

  const handleAIHelp = async () => {
    if (!editingMovie.title || !editingMovie.genre) {
      alert("Vui lòng nhập tên phim và chọn thể loại trước khi nhờ AI.");
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
    if (confirm("Bạn có chắc chắn muốn xóa bộ phim này?")) {
      setMovies(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        
        <div className="relative w-72">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>

          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="pl-10 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          onClick={() => {
            setEditingMovie({});
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <i className="fas fa-plus"></i> Thêm phim
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {movies.map(movie => (
          <div
            key={movie.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group"
          >

            <div className="relative h-64">

              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">

                <button
                  onClick={() => {
                    setEditingMovie(movie);
                    setIsModalOpen(true);
                  }}
                  className="w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
                >
                  <i className="fas fa-edit"></i>
                </button>

                <button
                  onClick={() => handleDelete(movie.id)}
                  className="w-10 h-10 bg-white text-rose-500 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
                >
                  <i className="fas fa-trash"></i>
                </button>

              </div>

              <span className="absolute top-4 left-4 px-2 py-1 bg-white/90 backdrop-blur rounded text-xs font-bold text-slate-800">
                {movie.genre}
              </span>

            </div>

            <div className="p-5">

              <h3 className="text-lg font-bold text-slate-800 mb-1">
                {movie.title}
              </h3>

              <p className="text-sm text-slate-500 mb-3">
                {movie.duration} phút
              </p>

              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {movie.description}
              </p>

            </div>

          </div>
        ))}

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 overflow-hidden">

            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              {editingMovie.id ? "Cập nhật phim" : "Thêm phim mới"}
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tên phim
                </label>

                <input
                  type="text"
                  value={editingMovie.title || ""}
                  onChange={e =>
                    setEditingMovie({
                      ...editingMovie,
                      title: e.target.value
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Thời lượng (phút)
                  </label>

                  <input
                    type="number"
                    value={editingMovie.duration || ""}
                    onChange={e =>
                      setEditingMovie({
                        ...editingMovie,
                        duration: Number(e.target.value)
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Thể loại
                  </label>

                  <select
                    value={editingMovie.genre || ""}
                    onChange={e =>
                      setEditingMovie({
                        ...editingMovie,
                        genre: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Chọn thể loại</option>
                    <option>Action</option>
                    <option>Comedy</option>
                    <option>Drama</option>
                    <option>Horror</option>
                    <option>Sci-Fi</option>
                  </select>

                </div>

              </div>

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mô tả phim
                </label>

                <textarea
                  value={editingMovie.description || ""}
                  onChange={e =>
                    setEditingMovie({
                      ...editingMovie,
                      description: e.target.value
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                ></textarea>

              </div>

            </div>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg"
              >
                Hủy
              </button>

              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Lưu lại
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default MovieManagement;