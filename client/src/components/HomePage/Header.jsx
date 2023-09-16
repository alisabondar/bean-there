import React from 'react';
import logoImage from '../../pages/img/logo.png';

function Header() {
  return (
    <header className="container flex  justify-between items-center p-8 relative">
      <div className="flex items-center">
        <img src={logoImage} alt="MyCompany Logo" className="h-[130px] w-auto mr-2  rounded-lg "/>
      </div>
      <nav>
        <ul className="flex space-x-8 text-white text-lg font-bold">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">Contacts</a></li>
          <li className='text-[#CFB299] hover:text-[#9F643D]'><a href="#">Login</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
