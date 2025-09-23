import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h2>
        <RegisterForm />
        <p className="text-sm text-center text-gray-500 mt-4">
        <a href="/login" className="text-amber-600 hover:underline">Kembali</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
