import React, { useEffect, useRef} from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import middleBackground from '../../pages/img/middleBackground.avif';
import history from '../../pages/img/history.avif';

function CoffeeHis () {

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
        <div className="flex flex-wrap pb-[80px]">


        <section className="w-full p-10 md:w-1/2 md:px-32 hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
          <div className="flex flex-col justify-center items-center h-full text-center">
            <h2 className="text-2xl font-bold mb-4">The History of Coffee</h2>
            <hr className="border-[#f08850] border-t-4  w-40 mb-4" />
            <p className="md:text-lg font-medium">
            Coffee grown worldwide can trace its heritage back centuries to the ancient coffee forests on the Ethiopian plateau. There, legend says the goat herder Kaldi first discovered the potential of these beloved beans.

The story goes that that Kaldi discovered coffee after he noticed that after eating the berries from a certain tree, his goats became so energetic that they did not want to sleep at night.

Kaldi reported his findings to the abbot of the local monastery, who made a drink with the berries and found that it kept him alert through the long hours of evening prayer. The abbot shared his discovery with the other monks at the monastery, and knowledge of the energizing berries began to spread.

As word moved east and coffee reached the Arabian peninsula, it began a journey which would bring these beans across the globe.
            </p>
          </div>
        </section>

        <motion.section
        ref={ref}
        variants={{
          hidden: { opacity:0, y: 75},
          visible:{ opacity:1, y:0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{duration: 0.5, delay: 0.25}}
        className="relative w-full p-10 md:w-1/2  rounded-lg pt-[90px] pb-[80px] bg-cover bg-center my-12"
         style={{ backgroundImage: `url(${middleBackground})` }}>
  <div className="relative z-10 flex justify-center items-center h-full">
    <img src={history} alt="Middle Section Image" className="max-w-full rounded-lg h-auto ml-auto md:-ml-40 sm:ml-0 lg:-mr-100"/>
  </div>
</motion.section>
        </div>
      </div>

  );
}

export default CoffeeHis ;
