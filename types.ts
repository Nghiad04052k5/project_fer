
export enum RoomType {
  STANDARD = 'Standard',
  VIP = 'VIP',
  LARGE = 'Phòng Lớn',
  SMALL = 'Phòng Nhỏ',
  IMAX = 'IMAX'
}

export enum SeatType {
  REGULAR = 'Thường',
  VIP = 'VIP',
  DOUBLE = 'Ghế Đôi',
  BED = 'Ghế Nằm'
}

export enum MovieGenre {
  ACTION = 'Hành Động',
  COMEDY = 'Hài Hước',
  DRAMA = 'Chính Kịch',
  HORROR = 'Kinh Dị',
  SCI_FI = 'Viễn Tưởng'
}

export enum CinemaChain {
  CGV = 'CGV Cinemas',
  LOTTE = 'Lotte Cinema',
  STARLIGHT = 'Starlight',
  DCINE = 'D.Cine',
  BHD = 'BHD Star'
}

export interface Cinema {
  id: string;
  chain: CinemaChain;
  name: string;
  address: string;
}

export interface Movie {
  id: string;
  title: string;
  duration: number; // in minutes
  genre: MovieGenre;
  description: string;
  posterUrl: string;
}

export interface Room {
  id: string;
  cinemaId: string;
  name: string;
  type: RoomType;
  rows: number;
  cols: number;
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  roomId: string;
  startTime: string; // ISO string
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
}
