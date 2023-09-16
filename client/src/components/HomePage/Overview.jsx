import React from 'react';
import meetUp from '../../pages/img/meetUp.jpeg';
import coffeeShops from '../../pages/img/coffeeShops.jpeg';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

function Overview() {
  return (
    <div className="relative">
      <div className="flex flex-col justify-between items-center relative">
        <div className="flex mr-auto mt-27 pt-20">
          <div className=' text-center'>
            <h1 className="text-xl font-extrabold mb-4  text-center tracking-wider text-[#A98E77]">The Ultimate Platform for Coffee <br/> Lovers</h1>
            <p className="mb-4 text-white  font-[poppings] custom-font-size">
              Find your tribe, <br/>
              discover local coffee spots, <br/>
              and take your love for coffee to <br/>
              the next level.
            </p>
            <button className=" hover:bg-[#A98E77] border-2 border-[#CFB299]  text-white font-bold mt-4 py-2 px-4 rounded">
          CREATE ACCOUNT
        </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-10 mb-10 space-y-4 md:space-x-8 md:space-y-0 md:ml-auto relative hover:cursor-pointer">
  <div className="w-[188px] h-[188px] relative mx-auto md:mx-0">
    <img src={coffeeShops} alt="shops around" className="rounded-lg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <div className="absolute inset-0 space-x-8 flex items-center justify-center">
      <div className="bg-opacity-60 bg-[#61493C] hover:bg-opacity-80 text-white text-center p-2">
        Explore nearby <br/> coffee shops <br />
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <AiOutlineArrowLeft className='text-[#f09d56]' />
        </div>
      </div>
    </div>
  </div>

  <div className="w-[188px] h-[188px] relative rounded-lg mx-auto md:mx-0">
    <img src={meetUp} alt="meet ups" className="rounded-lg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    <div className="absolute inset-0 space-x-8 flex items-center justify-center">
      <div className="bg-opacity-60 bg-[#61493C] hover:bg-opacity-80 text-white text-center p-2 ">
        Find Your Brew <br/> Crew  <br />
        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <AiOutlineArrowRight className='text-[#f09d56]' />
        </div>
      </div>
    </div>
  </div>
</div>


      </div>
      <style>
        {`
          .custom-font-size {
            font-size: 26px;
          }
        `}
      </style>
    </div>
  );
}

export default Overview;
