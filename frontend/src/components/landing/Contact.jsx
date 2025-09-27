import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="py-12 px-4 min-h-screen flex items-center justify-center bg-gradient-tob from-white to-gray-300" >
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
          Hubungi Kami
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Mari bergabung dengan kami untuk menciptakan perubahan positif. Kami siap mendengarkan dan berkolaborasi dengan Anda.
        </p>

        <div className="bg-orange-50 rounded-lg p-6 md:p-8">
          <h3 className="text-xl font-semibold text-orange-500 mb-6 text-center">
            Informasi Kontak
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            {/* Hotline */}
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl">
                <FaPhone />
              </div>
              <div>
                <p className="font-semibold">Hotline</p>
                <p>+62 881-6997-3567</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>support@gsosial.com</p>
              </div>
            </div>

            {/* Alamat */}
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="font-semibold">Alamat</p>
                <p>
                  Jl. Rawa Barat No.12, RT.03/RW.010, Rawa,
                  Kec. Pasit, Kab. Bandung Timur, Jawa Barat 40286
                </p>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl">
                <FaInstagram />
              </div>
              <div>
                <p className="font-semibold">Instagram</p>
                <p>@gsosial.community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
