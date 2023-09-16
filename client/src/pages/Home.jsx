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
      <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay */}
        <div className="mx-4 lg:mx-45 md:mx-28">
          <Header />
          <Overview />
        </div>
      </div>
      <div>
        <Middle />
        <div className=''>
          <About />
          <Footer />

        </div>

      </div>
    </div>
  );
};


export default Home;

