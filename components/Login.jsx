
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [account, setAccount] = useState(location.state?.username || "");
  const [password, setPassword] = useState(location.state?.password || "");

  const handleLogin = () => {

    // ADMIN cố định
    if (account === "admin" && password === "123") {

      const adminUser = {
        username: "admin",
        fullName: "Administrator",
        role: "admin"
      };

      localStorage.setItem("user", JSON.stringify(adminUser));

      navigate("/");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        (u.username === account || u.email === account) &&
        u.password === password
    );

    if (!user) {
      alert("Sai tài khoản hoặc mật khẩu");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    alert("Đăng nhập thành công");

    navigate("/");
  };

  return (

    <div className="flex justify-center items-center h-screen bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username hoặc Email"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </p>

      </div>

    </div>

  );

};

export default Login;