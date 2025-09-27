import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { register } from "../../services/authService";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [handphone, setHandphone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clearForm = () => {
    setName("");
    setGender("");
    setAddress("");
    setHandphone("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok");
      return;
    }

    try {
      const res = await register({
        name,
        gender,
        address,
        handphone,
        email,
        password,
      });

      alert(res.data.message || "Registrasi berhasil, menunggu approval admin");
      clearForm();
    } catch (err) {
      console.error("Register error:", err);
      alert(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Masukkan Nama"
      />
      <div className="mb-4">
        <label className="block mb-1">Jenis Kelamin</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border rounded p-2"
          required
        >
          <option value="">-- Pilih --</option>
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
      </div>
      <InputField
        label="Alamat"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Masukkan Alamat"
      />
      <InputField
        label="Handphone"
        inputMode="numeric"
        maxLength="16"
        value={handphone}
        onChange={(e) => setHandphone(e.target.value)}
        placeholder="Masukkan Handphone"
      />
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
      <InputField
        label="Ulangi Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Ulangi password"
      />
      <SubmitButton text="Register" />
    </form>
  );
};

export default RegisterForm;
