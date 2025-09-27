import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-sm sm:max-w-md">
      <p className="w-full text-sm  text-gray-500">
        <Link to="/" className="text-amber-600 hover:underline">
          ← Kembali
        </Link>
      </p>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
        <LoginForm />

        {/* Link ke Register */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Belum punya akun?{' '}
          <Link to="/register" className="text-amber-600 hover:underline">
            Register
          </Link>
        </p>

        {/* Link ke Home */}
        
      </div>
    </div>
  );
};

export default LoginPage;
