import { motion, AnimatePresence } from "framer-motion";
import meetUp from "../../pages/img/meetUp.avif";
import coffeeShops from "../../pages/img/coffeeshops.avif";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../../animation/motion";

function Overview() {
  return (
    <AnimatePresence>
      <div className="relative">
        <div className="flex flex-col justify-between items-center relative">
          <div className="flex mr-auto mt-27 pt-20">
            <motion.div {...headContainerAnimation}>
              <div className=" text-center">
                <h1 className="text-2xl font-extrabold mb-4  text-center tracking-wider text-[#A98E77]">
                  The Ultimate Platform for Coffee <br /> Lovers
                </h1>
                <p className="mb-4 text-white  custom-font-size">
                  Find your tribe, <br />
                  discover local coffee spots, <br />
                  and take your love for coffee to <br />
                  the next level.
                </p>
                <button
                  className=" hover:bg-[#A98E77] border-2 border-[#CFB299]  text-white font-bold mt-4 py-2 px-4 rounded
            hover:scale-105 transition duration-300 ease-in-out"
                >
                  CREATE ACCOUNT
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col md:flex-row p-10  space-y-4 md:space-x-8 md:space-y-0 md:ml-auto relative hover:cursor-pointer md:mt-[-50px]"
            {...slideAnimation("right")}
          >
            <div className="w-[188px] h-[188px] relative mx-auto md:mx-0 hover:scale-105 transition duration-300 ease-in-out rounded-lg">
              <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
              <img
                src={coffeeShops}
                alt="shops around"
                className="rounded-lg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="absolute inset-0 space-x-8 flex items-center justify-center">
                <div className=" text-white font-bold text-center p-2 ">
                  Explore nearby <br /> coffee shops <br />
                  <div
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  >
                    <AiOutlineArrowLeft size={25} className="text-[#f09d56]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[188px] h-[188px] relative rounded-lg mx-auto md:mx-0 hover:scale-105 transition duration-300 ease-in-out">
              <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
              <img
                src={meetUp}
                alt="meet ups"
                className="rounded-lg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="absolute inset-0 space-x-8 flex items-center justify-center">
                <div className=" text-white font-bold text-center p-2 ">
                  Find Your Brew <br /> Crew <br />
                  <div
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  >
                    <AiOutlineArrowRight size={25} className="text-[#f09d56]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <style>
          {`
          .custom-font-size {
            font-size: 24px;
          }
        `}
        </style>
      </div>
    </AnimatePresence>
  );
}

export default Overview;
