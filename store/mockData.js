
import { MovieGenre, RoomType, CinemaChain } from "../types";

export const INITIAL_MOVIES = [
  {
    id: "m1",
    title: "Avengers: Endgame",
    duration: 181,
    genre: MovieGenre.ACTION,
    description: "Trận chiến cuối cùng của các siêu anh hùng chống lại Thanos.",
    posterUrl:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "m2",
    title: "Interstellar",
    duration: 169,
    genre: MovieGenre.SCI_FI,
    description:
      "Một chuyến du hành vượt không gian để tìm ngôi nhà mới cho nhân loại.",
    posterUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "m3",
    title: "The Conjuring",
    duration: 112,
    genre: MovieGenre.HORROR,
    description:
      "Cặp vợ chồng Ed và Lorraine Warren giúp đỡ một gia đình đang bị ma ám.",
    posterUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=400",
  },
];

export const CINEMAS = [
  { id: "c1", chain: CinemaChain.CGV, name: "CGV Vincom Center", address: "Quận 1, TP.HCM" },
  { id: "c2", chain: CinemaChain.LOTTE, name: "Lotte Nam Sài Gòn", address: "Quận 7, TP.HCM" },
  { id: "c3", chain: CinemaChain.STARLIGHT, name: "Starlight Đà Nẵng", address: "Hải Châu, Đà Nẵng" },
  { id: "c4", chain: CinemaChain.DCINE, name: "D.Cine Bến Thành", address: "Quận 1, TP.HCM" },
];

export const INITIAL_ROOMS = [
  { id: "r1", cinemaId: "c1", name: "P1 - IMAX", type: RoomType.IMAX, rows: 15, cols: 20 },
  { id: "r2", cinemaId: "c1", name: "P2 - Gold Class", type: RoomType.VIP, rows: 5, cols: 10 },
  { id: "r3", cinemaId: "c2", name: "Cinema 1", type: RoomType.STANDARD, rows: 10, cols: 12 },
  { id: "r4", cinemaId: "c3", name: "Phòng 01", type: RoomType.LARGE, rows: 12, cols: 15 },
];

// Tạo lịch chiếu mẫu
const today = new Date();
today.setHours(0, 0, 0, 0);

export const INITIAL_SHOWTIMES = [
  { id: "s1", movieId: "m1", cinemaId: "c1", roomId: "r1", price: 150000, startTime: new Date(today.getTime() + 10 * 3600000).toISOString() },
  { id: "s2", movieId: "m1", cinemaId: "c1", roomId: "r1", price: 150000, startTime: new Date(today.getTime() + 14 * 3600000).toISOString() },

  { id: "s3", movieId: "m1", cinemaId: "c2", roomId: "r3", price: 95000, startTime: new Date(today.getTime() + 11 * 3600000).toISOString() },
  { id: "s4", movieId: "m1", cinemaId: "c2", roomId: "r3", price: 95000, startTime: new Date(today.getTime() + 15 * 3600000).toISOString() },

  { id: "s5", movieId: "m1", cinemaId: "c3", roomId: "r4", price: 75000, startTime: new Date(today.getTime() + 9 * 3600000).toISOString() },
  { id: "s6", movieId: "m1", cinemaId: "c3", roomId: "r4", price: 75000, startTime: new Date(today.getTime() + 13 * 3600000).toISOString() },

  { id: "s7", movieId: "m2", cinemaId: "c4", roomId: "r4", price: 85000, startTime: new Date(today.getTime() + 19 * 3600000).toISOString() },
];

export const INITIAL_CUSTOMERS = Array.from({ length: 50 }, (_, i) => ({
  id: `c${i + 1}`,
  name: `Khách hàng ${i + 1}`,
  email: `customer${i}@example.com`,
  phone: `0901234${String(i).padStart(3, "0")}`,
  loyaltyPoints: Math.floor(Math.random() * 1000),
}));