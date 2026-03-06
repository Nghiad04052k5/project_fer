import React, { useState } from 'react';
import { INITIAL_ROOMS } from '../store/mockData';
import { SEAT_COLORS } from '../constants';
import { SeatType } from '../types';

const RoomManagement = () => {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [selectedRoom, setSelectedRoom] = useState(INITIAL_ROOMS[0]);
  
  // Dummy seat type generator based on row
  const getSeatType = (rowIdx, totalRows) => {
    if (rowIdx === totalRows - 1) return SeatType.BED;
    if (rowIdx === totalRows - 2) return SeatType.DOUBLE;
    if (rowIdx < 3) return SeatType.REGULAR;
    return SeatType.VIP;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      
      {/* Room List */}
      <div className="xl:col-span-1 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Danh sách phòng</h2>

        {rooms.map(room => (
          <button 
            key={room.id}
            onClick={() => setSelectedRoom(room)}
            className={`w-full text-left p-6 rounded-2xl border transition-all ${
              selectedRoom?.id === room.id 
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20 ring-4 ring-indigo-600/10' 
                : 'bg-white text-slate-800 border-slate-100 hover:border-indigo-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                selectedRoom?.id === room.id ? 'bg-indigo-400 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {room.type}
              </span>

              <i className={`fas fa-door-open ${selectedRoom?.id === room.id ? 'text-indigo-300' : 'text-slate-300'}`}></i>
            </div>

            <h3 className="font-bold text-lg">{room.name}</h3>

            <p className={`text-sm mt-1 ${selectedRoom?.id === room.id ? 'text-indigo-100' : 'text-slate-400'}`}>
              Kích thước: {room.rows} hàng x {room.cols} ghế ({room.rows * room.cols} chỗ)
            </p>
          </button>
        ))}
      </div>

      {/* Seat Layout View */}
      <div className="xl:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
        {selectedRoom ? (
          <>
            <div className="mb-12 w-full max-w-md">
              <div className="h-2 w-full bg-slate-300 rounded-full shadow-lg shadow-slate-200 mb-2"></div>
              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                Màn hình
              </p>
            </div>
            
            <div className="space-y-2 overflow-auto max-w-full pb-4">
              {Array.from({ length: selectedRoom.rows }).map((_, rIdx) => (
                <div key={rIdx} className="flex gap-2 items-center">

                  <span className="w-6 text-xs font-bold text-slate-400">
                    {String.fromCharCode(65 + rIdx)}
                  </span>

                  {Array.from({ length: selectedRoom.cols }).map((_, cIdx) => {

                    const sType = getSeatType(rIdx, selectedRoom.rows);

                    let colorClass = SEAT_COLORS.REGULAR;
                    if (sType === SeatType.VIP) colorClass = SEAT_COLORS.VIP;
                    if (sType === SeatType.DOUBLE) colorClass = SEAT_COLORS.DOUBLE;
                    if (sType === SeatType.BED) colorClass = SEAT_COLORS.BED;

                    return (
                      <div 
                        key={cIdx}
                        className={`w-8 h-8 rounded-md border-b-4 transition-all cursor-pointer flex items-center justify-center text-[10px] font-bold ${colorClass}`}
                        title={`${sType}`}
                      >
                        {cIdx + 1}
                      </div>
                    );
                  })}

                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-6 justify-center bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full">

              {[
                { label: 'Ghế thường', color: SEAT_COLORS.REGULAR },
                { label: 'Ghế VIP', color: SEAT_COLORS.VIP },
                { label: 'Ghế Đôi (Couple)', color: SEAT_COLORS.DOUBLE },
                { label: 'Ghế Nằm', color: SEAT_COLORS.BED },
                { label: 'Đã đặt', color: SEAT_COLORS.BOOKED },
              ].map((item, i) => (

                <div key={i} className="flex items-center gap-2">

                  <div className={`w-5 h-5 rounded border-b-2 ${item.color}`}></div>

                  <span className="text-xs font-medium text-slate-600">
                    {item.label}
                  </span>

                </div>

              ))}

            </div>
          </>
        ) : (

          <div className="flex flex-col items-center justify-center h-full text-slate-400 italic">

            <i className="fas fa-mouse-pointer text-4xl mb-4"></i>

            Chọn một phòng để xem sơ đồ ghế

          </div>

        )}
      </div>

    </div>
  );
};

export default RoomManagement;