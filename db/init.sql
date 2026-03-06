
-- Khởi tạo Database cho CineMaster Pro
-- Tích hợp đa hệ thống: CGV, Lotte, Starlight, D.Cine

-- 1. Bảng Chuỗi Rạp (Chains)
CREATE TABLE cinema_chains (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url TEXT,
    description TEXT
);

-- 2. Bảng Rạp Cụ Thể (Cinemas)
CREATE TABLE cinemas (
    id SERIAL PRIMARY KEY,
    chain_id INTEGER REFERENCES cinema_chains(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100),
    phone VARCHAR(20)
);

-- 3. Bảng Phim (Movies)
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(50),
    duration_minutes INTEGER,
    description TEXT,
    poster_url TEXT,
    release_date DATE,
    rating VARCHAR(10)
);

-- 4. Bảng Phòng Chiếu (Rooms)
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    cinema_id INTEGER REFERENCES cinemas(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    room_type VARCHAR(50), -- VIP, IMAX, Standard, Large, Small
    total_rows INTEGER,
    total_cols INTEGER
);

-- 5. Bảng Ghế (Seats)
CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
    row_label CHAR(2) NOT NULL,
    seat_number INTEGER NOT NULL,
    seat_type VARCHAR(50) DEFAULT 'Regular', -- Regular, VIP, Double, Bed
    UNIQUE(room_id, row_label, seat_number)
);

-- 6. Bảng Suất Chiếu (Showtimes)
CREATE TABLE showtimes (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    base_price DECIMAL(12, 2) NOT NULL
);

-- 7. Bảng Khách Hàng (Customers)
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Bảng Đặt Vé (Bookings)
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    showtime_id INTEGER REFERENCES showtimes(id),
    total_amount DECIMAL(12, 2),
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Bảng Chi Tiết Ghế Đã Đặt
CREATE TABLE ticket_items (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    seat_id INTEGER REFERENCES seats(id),
    price DECIMAL(12, 2)
);

-- DỮ LIỆU MẪU --
INSERT INTO cinema_chains (name) VALUES ('CGV Cinemas'), ('Lotte Cinema'), ('Starlight'), ('D.Cine');

INSERT INTO cinemas (chain_id, name, address) VALUES 
(1, 'CGV Vincom Center', 'Quận 1, TP.HCM'),
(2, 'Lotte Nam Sài Gòn', 'Quận 7, TP.HCM'),
(3, 'Starlight Đà Nẵng', 'Hải Châu, Đà Nẵng');

INSERT INTO movies (title, genre, duration_minutes, description, poster_url) VALUES 
('Avengers: Endgame', 'Hành Động', 181, 'Cuộc chiến cuối cùng', 'https://picsum.photos/seed/avengers/400/600'),
('Interstellar', 'Viễn Tưởng', 169, 'Hành trình không gian', 'https://picsum.photos/seed/interstellar/400/600');

-- Tạo 1000 khách hàng mẫu (Dùng Script hoặc Loop trong thực tế)
-- Ở đây chèn 5 bản ghi ví dụ
INSERT INTO customers (full_name, email, phone) VALUES 
('Nguyễn Văn A', 'a@example.com', '0901234567'),
('Trần Thị B', 'b@example.com', '0901234568'),
('Lê Văn C', 'c@example.com', '0901234569'),
('Phạm Thị D', 'd@example.com', '0901234570'),
('Hoàng Văn E', 'e@example.com', '0901234571');
