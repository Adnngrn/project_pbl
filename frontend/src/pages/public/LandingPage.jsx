import React from 'react';
import Navbar from '../../components/landing/Navbar';
import Home from '../../components/landing/Home';
import About from '../../components/landing/About';
import Event from '../../components/landing/Event';
import Contact from '../../components/landing/Contact';


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
        <Section id="program" contents={<Event/>} />
        <Section id="contact" contents={<Contact/>}/>
      </div>
    </div>
  );
};

export default LandingPage;
