import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import about from "../../pages/img/about.jpeg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    console.log(isInView);

    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);
  return (
    <section className="relative bg-[#493f39] p-20 md:p-56  text-white">
      <img
        src={about}
        alt="About Section"
        className="object-cover object-center w-full h-full absolute inset-0"
      />
      <div className="container mx-auto px-4 md:px-4 md:max-w-3xl h-full flex items-center justify-center relative ">
        <motion.section
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center"
        >
          <h1 className="text-4xl">About Us</h1>
          <p className="text-xl mt-4">
            Welcome to BeanThere, your go-to platform for all things coffee.
            From discovering local cafes to connecting with fellow enthusiasts,
            we make your coffee journey seamless and social.
          </p>
          <p className="text-xl mt-4">
            Let's make the world a more caffeinated place, together!
          </p>
        </motion.section>
      </div>
    </section>
  );
};

export default About;
