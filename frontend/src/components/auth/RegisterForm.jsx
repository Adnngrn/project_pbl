import React, { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const RegisterForm = () => {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [handphone, setHandphone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('NIK:', nik);
    console.log('Nama:', nama);
    console.log('Handphone:', handphone);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <form onSubmit={handleSubmit}>
        <InputField
            label="NIK"
            inputmode="numeric"
            pattern="[0-9]{16}"
            maxlength="16"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            placeholder="Masukkan NIK"
        />
        <InputField
            label="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan Nama"
        />
        <InputField
            label="Handphone"
            inputmode="numeric"
            pattern="[0-9]{10,16}"
            maxlength="16"
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
        <SubmitButton text="Register" />
    </form>
  );
};

export default RegisterForm;
