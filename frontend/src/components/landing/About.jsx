import React from 'react';
import gsosialImage from '../../assets/gsosial1.jpg';

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-22 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* KONTEN KANAN (TEKS), MUNCUL DULU DI MOBILE */}
      <div className="order-1 md:order-2 space-y-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
          Tentang GSosial
        </h2>

        <div className="text-gray-700 leading-relaxed space-y-4">
          <p className="text-md md:text-lg">
            GSosial lahir dari kepedulian akan pentingnya kesempatan yang setara bagi semua, khususnya remaja, agar mereka tumbuh menjadi generasi yang sehat, cerdas, dan berdaya.
            Kami percaya bahwa setiap individu berhak mendapatkan akses yang sama terhadap pendidikan, kesehatan, dan kesempatan untuk berkembang.
          </p>
          <p className="text-md md:text-lg">
            Melalui program-program yang terstruktur dan berkelanjutan, kami berkomitmen untuk memberikan dampak nyata dalam masyarakat dan menciptakan perubahan positif yang berkelanjutan untuk generasi mendatang.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-2xl mb-2">Visi GSosial</h3>
          <blockquote className="border-l-4 border-orange-400 bg-orange-50 rounded text-md md:text-lg p-4 text-gray-700 italic">
            "Mewujudkan masyarakat Indonesia yang berdaya, mandiri, dan berkelanjutan melalui kolaborasi ekosistem yang inklusif dan partisipatif"
          </blockquote>
        </div>

        <div>
          <h3 className="font-semibold text-2xl mb-4">Misi GSosial</h3>
          <ul className="space-y-3 text-md md:text-lg text-gray-700">
            <li className="flex items-center gap-4 p-2 rounded-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <span className="text-center bg-amber-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full">1.</span>
              <span>Meningkatkan kualitas hidup masyarakat melalui pendidikan dan pelatihan</span>
            </li>
            <li className="flex items-center gap-4 p-2 rounded-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <span className="text-center bg-amber-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full">2.</span>
              <span>Mengembangkan potensi ekonomi masyarakat melalui pemberdayaan UMKM</span>
            </li>
            <li className="flex items-center gap-4 p-2 rounded-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <span className="text-center bg-amber-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full">3.</span>
              <span>Meningkatkan kesejahteraan sosial masyarakat melalui program sosial</span>
            </li>
            <li className="flex items-center gap-4 p-2 rounded-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <span className="text-center bg-amber-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full">4.</span>
              <span>Mengembangkan infrastruktur dan fasilitas publik yang berkualitas</span>
            </li>
          </ul>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-5 py-2 rounded shadow-md">
          Pelajari Program Kami
        </button>
      </div>

      {/* KONTEN KIRI (GAMBAR), MUNCUL DI BAWAH SAAT MOBILE */}
      <div className="order-2 md:order-1 space-y-6">
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img
            src={gsosialImage}
            alt="GSosial"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-2 gap-4 text-center text-gray-700">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-orange-600 text-2xl font-extrabold">5+</div>
            <p className="text-sm mt-1">Tahun Pengalaman</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-orange-600 text-2xl font-extrabold">1000+</div>
            <p className="text-sm mt-1">Masyarakat Terbantu</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
