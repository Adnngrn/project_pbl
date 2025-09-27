import React from 'react';
import bgImage from '../../assets/bg-gsosial.jpg';


const CardKomitmen = ({icon, title, content}) => (
    <div className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="font-semibold mb-2 text-xl md:text-2xl text-black">{title}</h3>
        <p className="text-md md:text-lg text-black">
            {content}
        </p>
    </div>
)

const Komitmen = () => (
  <div className="relative w-full">
    {/* Background Layer */}
    <div className="absolute inset-0 top-0 h-1/2 bg-amber-600 z-0" />

    {/* Content Layer */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center flex flex-col items-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow">Komitmen Kami</h2>
      <p className="mb-12 text-lg md:text-xl max-w-2xl leading-none mx-auto text-white drop-shadow">
        Kami berdedikasi untuk menciptakan perubahan positif dalam masyarakat melalui berbagai program yang berkelanjutan
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <CardKomitmen
          icon="🎓"
          title="Pendidikan Berkualitas"
          content="Menyediakan akses pendidikan yang berkualitas untuk semua kalangan masyarakat"
        />
        <CardKomitmen
          icon="🏥"
          title="Layanan Kesehatan"
          content="Memberikan layanan kesehatan dasar dan program kesehatan masyarakat"
        />
        <CardKomitmen
          icon="🤝"
          title="Pemberdayaan Masyarakat"
          content="Mengembangkan potensi masyarakat melalui program pelatihan dan pengembangan"
        />
        <CardKomitmen
          icon="🌱"
          title="Lingkungan Berkelanjutan"
          content="Mendorong praktik ramah lingkungan dan pembangunan berkelanjutan"
        />
      </div>
    </div>
  </div>
);



const Home = () => {
  return (
    <>
    <div className='min-h-screen relative'>
      {/* Background Image */}
      <div 
        className="w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>


      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center max-w-5xl mx-auto">
        <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight">
          Lorem Ipsum
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Lorem ipsum dolor sit amet.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
            Pelajari Lebih Lanjut
          </button>
          <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
            Bergabung dengan Kami
          </button>
        </div>
      </div>
    </div>
    <Komitmen/>
    </>
  );
};

export default Home;