
// import React from 'react';
import Header from '../components/HomePage/Header.jsx';
import Overview from '../components/HomePage/Overview.jsx';
import Middle from '../components/HomePage/Middle.jsx';
import CoffeeHis from '../components/HomePage/CoffeeHis.jsx';
import About from '../components/HomePage/About.jsx';
import Footer from '../components/HomePage/Footer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
// import Location from './Location.jsx';
import backgroundImage from './img/overview.webp';
import { useSnapshot } from 'valtio';
import state from '../store';




const Home = () => {

  const snap = useSnapshot(state);


  return (
    <div className="App">
    {/* login and rejister components */}
      {snap.login && <Login />}
      {snap.register  && <Register />}
    <div className={ ((snap.login || snap.register) && "blur-md") || ""}>
      <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay */}
        <div className="mx-4 md:mx-28">
          <Header />
          <Overview />
        </div>

      </div>
      <div>
      <div className="w-screen flex justify-end">
  <hr className="border-[#9F643D] border-t-8 w-[40%]" />
</div>
        <Middle />
        <CoffeeHis />
        <div>
        <hr className="border-[#493f39] border-t-8 w-[100%]" />
        <hr className="border-[#493f39] border-t-8 w-[100%]" />
         <About />
          <Footer />
        </div>
      </div>
    </div>
  </div>
  );
};


export default Home;

