import React from 'react';
import Header from '../components/HomePage/Header.jsx';
import Overview from '../components/HomePage/Overview.jsx';
import Middle from '../components/HomePage/Middle.jsx';
import About from '../components/HomePage/About.jsx';
import Footer from '../components/HomePage/Footer.jsx';
import backgroundImage from './img/overview.webp';

const Home = () => {
  return (
    <div className="App">
      <div className="relative  h-screen w-screen " style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-40 h-full w-full"></div> {/* Overlay */}
        <div className="mx-20">
        <Header />
        <Overview />
        </div>
      </div>
      <div className="mx-20">
      <Middle />
      <About />
      <Footer />

      </div>
    </div>
  );
};

export default Home;

