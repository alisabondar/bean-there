import React, { useEffect, useRef} from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import middle from '../../pages/img/middle.avif';
import middleBackground from '../../pages/img/middleBackground.avif';




function Middle() {

  const ref = useRef(null);
  const isInView = useInView(ref, {once:true});

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect (() => {
    console.log(isInView)

    if(isInView) {
      mainControls.start('visible');
      slideControls.start('visible');
    }


  }, [isInView])

  return (


      <div className='my-10'>
        <div         className="flex flex-wrap pt-[120px] pb-[40px]">
        <motion.section
        ref={ref}
        variants={{
          hidden: { opacity:0, y: 75},
          visible:{ opacity:1, y:0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{duration: 0.5, delay: 0.25}}
        className="relative w-full p-10 md:w-1/2 p-4 rounded-lg pt-[120px] pb-[80px] bg-cover bg-center"
         style={{ backgroundImage: `url(${middleBackground})` }}>
  <div className="relative z-10 flex justify-center items-center h-full">
    <img src={middle} alt="Middle Section Image" className="max-w-full rounded-lg h-auto ml-auto md:-mr-40 sm:ml-0 lg:-mr-100"/>
  </div>
</motion.section>


        <section className="w-full p-10 md:w-1/2 md:px-40 hover:scale-105 transition duration-300 ease-in-out cursor-pointer ">
          <div className="flex flex-col justify-center items-center h-full text-center">
            <h2 className="text-2xl font-bold mb-4">Did You Know?</h2>
            <hr className="border-[#f08850] border-t-4  w-40 mb-4" />
            <p className="md:text-lg font-medium">
            Coffee played a role in the spread of information and the exchange of ideas in early modern Europe.
             The first coffee houses, often referred to as "penny universities," emerged in the 17th century
              in London. For just the price of a cup of coffee—then a penny—people could engage in stimulating
              conversation, read the day's newspapers, and debate the issues of the time. These coffee houses
               became hubs of intellectual and social activity, helping to fuel the Enlightenment and serving as
             important venues for social networking long before the advent of the internet.
            </p>
          </div>
        </section>
        </div>
      </div>


  );
}

export default Middle;
