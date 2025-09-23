import React from 'react';
import Navbar from '../../components/landing/Navbar';
import Home from '../../components/landing/Home';
import About from '../../components/landing/About';

const Section = ({ id, contents, addClass }) => (
  <section id={id} className={`${addClass}`}>
    {contents}
  </section>
);

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <Section id="home" contents={<Home />} />
        <Section id="about" contents={<About/>}/>
        <Section id="program" contents="Program" addClass="min-h-screen flex items-center justify-center bg-purple-600" />
        <Section id="contact" contents="Contact" addClass="min-h-screen flex items-center justify-center bg-red-600" />
      </div>
    </div>
  );
};

export default LandingPage;
