import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Bio from "../components/profilePage/Bio.jsx";
import Calendar from "../components/profilePage/Calendar.jsx";
import Favs from "../components/profilePage/Favs.jsx";
import Friends from "../components/profilePage/Friends.jsx";
import NavBar from "./NavBar.jsx";
import Messenger from "./Messenger.jsx";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../animation/motion";

import {
  BsFillStarFill,
  BsFillCalendarCheckFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { FaUserFriends, FaHome } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState("bio");

  // Fetch user profile data
  useEffect(() => {
<<<<<<< HEAD
    axios
      .get("http://localhost:5001/user/profile", { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
      })
      .catch(() => {
        console.log("error getting profile");
      });
  }, []);

  // Fetch user friends data
  useEffect(() => {
    if (profile.id) {
      axios
        .get(`http://localhost:5001/user/${profile.id}/friends`, {
          withCredentials: true,
        })
        .then((res) => {
          setFriends(res.data.friends);
        })
        .catch(() => {
          console.log("error getting friends");
        });
    }
  }, [profile]);

  // Fetch user reviews data
  useEffect(() => {
    if (profile.id) {
      axios
        .get(`http://localhost:5001/user/${profile.id}/reviews`, {
          withCredentials: true,
        })
        .then((res) => {
          setReviews(res.data.reviews);
        })
        .catch(() => {
          console.log("error getting reviews");
        });
    }
  }, [profile]);

  // Fetch user wishlist data
  useEffect(() => {
    if (profile.id) {
      axios
        .get(`http://localhost:5001/user/${profile.id}/wishlist`, {
          withCredentials: true,
        })
        .then((res) => {
          setWishlist(res.data.wishlist);
        })
        .catch(() => {
          console.log("error getting wishlist");
        });
    }
  }, [profile]);

  // Handle button click to change selected component
  const handleButtonClick = (component) => {
    setSelectedComponent(component);
  };

  // Render the selected component
  const renderComponent = () => {
    switch (selectedComponent) {
      case "calendar":
        return <Calendar />;
      case "favs":
        return <Favs wishlist={wishlist} />;
        case "friends":
          return <Friends friends={friends} />;
        case "messenger":
          return <Messenger id={profile.id} />;
      case "bio":
        return <Bio about={profile.about} reviews={reviews} />;
      default:
        return null;
    }
  };

  return (

    <AnimatePresence>
    <div>
      {/* Link to external stylesheets */}
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <main className="profile-page  ">
        <NavBar />

        {/* Banner section */}
        <section className="relative block h-500-px">
          {/* Banner background */}
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${
                profile.banner_photo ||
                "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              })`,
            }}
          >
            {/* Overlay */}
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-30 bg-black"
            >
              {" "}
            </span>
          </div>


          {/* Banner shape */}
          <div
            className=" top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-[#f2eada] fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>


        </section>

        <motion.div {...headContainerAnimation}>

        {/* Profile information section */}
        <section className="relative py-16 bg-[#f2eada]">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                {/* Buttons */}
                <div className="flex flex-wrap justify-center">
                  {/* Button: Add Post */}
                  <div className="w-full  lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div
                      className="relative hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleButtonClick("bio")}
                    >
                      <img
                        alt="..."
                        src={
                          profile.photo ||
                          "https://i.pinimg.com/736x/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg"
                        }
                        className="shadow-xl rounded-full h-auto align-middle border-4 border-secondary absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  {/* Buttons */}

                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3  flex justify-center mt-32 sm:mt-0">
                      {/* Button: Add Post */}

                      {/* Button: Add Post */}
                      <button
                        onClick={() => handleButtonClick("bio")}
                        className="hover-button uppercase text-[#3C2A21] font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 hover:scale-110 transition duration-300 ease-in-out
                        hover:px-6"
                        style={{
                          backgroundColor: "#A98E77",
                          position: "relative",
                        }}
                        type="button"
                      >
                        <FaHome size={23} />
                      </button>

                      {/* Button: Friends */}
                      {/* Button: Friends */}
                      <button
                        onClick={() => handleButtonClick("friends")}
                        className="friends-hover-button uppercase text-[#3C2A21] font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 hover:scale-110 transition duration-300 ease-in-out
  hover:px-6"
                        style={{
                          backgroundColor: "#A98E77",
                          position: "relative",
                        }}
                        type="button"
                      >
                        <FaUserFriends size={23} />
                      </button>

                      {/* Button: Chat */}
                      {/* Button: Chat */}
                      <button
                        onClick={() => handleButtonClick("messenger")}
                        // handleButtonClick("location")}
                        className="chat-hover-button uppercase text-[#3C2A21] font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 hover:scale-110 transition duration-300 ease-in-out
  hover:px-6"
                        style={{
                          backgroundColor: "#A98E77",
                          position: "relative",
                        }}
                        type="button"
                      >
                        <BsFillChatDotsFill size={23} />
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="w-full py-4 lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-6 lg:pt-4 pt-8">
                      {/* Button: Coffee */}
                      <button
                        onClick={() => handleButtonClick("location")}
                        className="coffee-hover-button uppercase text-[#3C2A21] font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 hover:scale-110 transition duration-300 ease-in-out
  hover:px-6"
                        style={{
                          backgroundColor: "#A98E77",
                          position: "relative",
                        }}
                        type="button"
                      >
                        <GiCoffeeCup size={28} />
                      </button>

                      {/* Button: Calendar */}
                      <button
                        onClick={() => handleButtonClick("calendar")}
                        className="calendar-hover-button uppercase text-[#3C2A21] font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 hover:scale-110 transition duration-300 ease-in-out
  hover:px-7"
                        style={{
                          backgroundColor: "#A98E77",
                          position: "relative",
                        }}
                        type="button"
                      >
                        <BsFillCalendarCheckFill size={23} />
                      </button>
                      {/* Button: Favorites */}
                      <button
                        onClick={() => handleButtonClick("favs")}
                        className="favorites-hover-button uppercase text-[#3C2A21] font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 hover:scale-110 transition duration-300 ease-in-out
  hover:px-7"
                        style={{
                          backgroundColor: "#A98E77",
                          position: "relative",
                        }}
                        type="button"
                      >
                        <BsFillStarFill size={23} />
                      </button>
                    </div>
                  </div>
                </div>
                {/* User information */}
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {profile.username || "Jenna Stones"}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Los Angeles, California
                  </div>
                </div>
                {/* Render selected component */}
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      {renderComponent()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="relative bg-[#f2eada] pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
                    <p>
                      &copy; {new Date().getFullYear()} BEANTHERE. ALL RIGHTS
                      RESERVED.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </section>
       </motion.div>
      </main>
    </div>
    </AnimatePresence>
  );
}

export default Profile;
