import React from "react";

const Profile = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white w-[420px] p-10 rounded-2xl shadow-lg border">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Thông tin tài khoản
        </h2>

        <div className="space-y-4 text-gray-700">

          <div>
            <p className="text-sm text-gray-500">Họ và tên</p>
            <p className="font-semibold text-lg">{user?.fullName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-semibold text-lg">{user?.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-lg">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-semibold text-lg">{user?.role}</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;