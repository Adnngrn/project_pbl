import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });
      const data = res.data;

      // simpan token & info user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login berhasil");

      // redirect sesuai role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // nanti bisa diarahkan ke dashboard member
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukkan Email"
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Masukkan password"
      />
      <SubmitButton text="Login" />
    </form>
  );
};

export default LoginForm;
