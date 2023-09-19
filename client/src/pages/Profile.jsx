

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnapshot } from 'valtio';
import state from '../store';
import { BsMap, BsFillPlusCircleFill, BsFillStarFill, BsFillCalendarCheckFill, BsFillChatDotsFill} from 'react-icons/bs';
import { FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa';
import { GiCoffeeCup } from 'react-icons/gi';
import backgroundImage from './img/backgroundImage.png';
import Bio from '../components/profilePage/Bio.jsx';
import Calendar from '../components/profilePage/Calendar.jsx';
import Favs from '../components/profilePage/Favs.jsx';
import Friends from '../components/profilePage/Friends.jsx';
import Posts from '../components/profilePage/Posts.jsx';



//#7c6c60, AF8D6F, #918673
//bg-blueGray-200

function Profile() {
  const [profile, setProfile] = useState({})


  const [info, setInfo] = useState(false);
  const [someSortOfInfo, setSomeSortOfInfo] = useState('');


  useEffect(() => {
    axios.get('http://localhost:5001/user/profile', { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
      })
      .catch(() => {
        console.log("error getting profile");
      })
  }, [])

  const getFriends = (() => {
    // replace 2 with profile.id but at the moment we know user 2 has friends
    axios.get(`http://localhost:5001/user/${profile.id}/friends`, { withCredentials: true })
      .then((res) => {
        setInfo(true);
        setSomeSortOfInfo(JSON.stringify(res.data.friends));
        // console.log(res.data.friends);
      })
      .catch(() => {
        console.log("error getting friends");
      })
  });

  const getReviews = (() => {
    // replace 2 with profile.id but at the moment we know user 2 has reviews
    axios.get(`http://localhost:5001/user/${profile.id}/reviews`, { withCredentials: true })
      .then((res) => {
        setInfo(true);
        setSomeSortOfInfo(JSON.stringify(res.data.reviews));
        // console.log(res.data.reviews);
      })
      .catch(() => {
        console.log("error getting reviews");
      })
  });

  const getWishlist = (() => {
    // replace 2 with profile.id but at the moment we know user 2 has wishlist
    axios.get(`http://localhost:5001/user/${profile.id}/wishlist`, { withCredentials: true })
      .then((res) => {
        setInfo(true);
        setSomeSortOfInfo(JSON.stringify(res.data.wishlist));
        // console.log(res.data.wishlist);
      })
      .catch(() => {
        console.log("error getting wishlist");
      })

  })




    const [selectedComponent, setSelectedComponent] = useState('bio');


    const handleButtonClick = (component) => {
      state.homePage = false;
      state.postsPage = false;
      state.friendsPage = false;
      state.favsPage = false;
      state.calendarPage = false;
      state[`${component}Page`] = true;
      setSelectedComponent(component);
    };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'calendar':
        return <Calendar />;
      case 'favs':
        return <Favs />;
      case 'friends':
        return <Friends />;
      case 'posts':
        return <Posts />;
      case 'bio':
        return <Bio />;
      default:
        return null;
    }
  };
  return (
    <div >
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
      <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />

      <main className="profile-page ">
      <section className="relative block h-500-px ">
          <div className="absolute top-0 w-full h-full bg-center bg-cover "
          style={{
            backgroundImage:
            // `url('https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`
            `url(${profile.banner_photo})`
            ,
          }}
          >
            <span id="blackOverlay" className="w-full h-full absolute opacity-30 bg-black"></span>
          </div>
          <div className=" top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: 'translateZ(0px)' }}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="text-[#f2eada] fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>

        <section className="relative py-16 bg-[#f2eada]">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
                     onClick={() => handleButtonClick('bio')}>
                      <img alt="..." src="https://gray-wfsb-prod.cdn.arcpublishing.com/resizer/0iJ7vDpX2zZdSFnsF57WxMRelIA=/800x800/smart/filters:quality(70)/s3.amazonaws.com/arc-authors/gray/539ba86e-fad7-490f-a82c-439e3a3896d7.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button onClick={() => getWishlist()}
                       style={{ backgroundColor: '#A98E77' }}
                       onClick={() => handleButtonClick('posts')}
                      className=" uppercase  text-[#3C2A21]  font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1  hover:scale-110 transition duration-300 ease-in-out" type="button">
                       <BsFillPlusCircleFill  size={23}/>

                      </button>
                      <button onClick={() => getFriends()}
                       style={{ backgroundColor: '#A98E77' }}
                       onClick={() => handleButtonClick('friends')}
                      className="uppercase  text-[#3C2A21]  font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1  hover:scale-110 transition duration-300 ease-in-out " type="button">
                        <FaUserFriends  size={23}/>

                      </button>
                      <button
                       style={{ backgroundColor: '#A98E77' }}
                       onClick={() => handleButtonClick('location')}>>>>>>> main
                       className=" uppercase  text-[#3C2A21]  font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1  hover:scale-110 transition duration-300 ease-in-out" type="button">
                       <BsFillChatDotsFill size={23} />
                      </button>


                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <button
                       style={{ backgroundColor: '#A98E77' }}
                       onClick={() => handleButtonClick('location')}
                       className=" uppercase  text-[#3C2A21]  font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1  hover:scale-110 transition duration-300 ease-in-out" type="button">
                       <GiCoffeeCup size={28} />
                      </button>
                    <button
                       style={{ backgroundColor: '#A98E77' }}
                       onClick={() => handleButtonClick('calendar')}
                       className=" uppercase  text-[#3C2A21]  font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1  hover:scale-110 transition duration-300 ease-in-out" type="button">
                       <BsFillCalendarCheckFill size={23} />
                      </button>
                      <button onClick={() => getReviews()}
                        style={{ backgroundColor: '#A98E77' }}
                        onClick={() => handleButtonClick('favs')}
                      className=" uppercase  text-[#3C2A21]  font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1  hover:scale-110 transition duration-300 ease-in-out" type="button">
                       <BsFillStarFill  size={23}/>

                      </button>

                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {/* Jenna Stones */}
                    {profile.username}

                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Los Angeles, California
      {info && <p>{someSortOfInfo}</p>}
                  </div>

                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">

                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {/* Hey there, coffee aficionados! I'm Jenna, your friendly neighborhood coffee explorer.
                       My passion for coffee knows no bounds, and I'm always on a quest to find the perfect brew.
                       I've embarked on coffee adventures to various corners of the world, from the bustling cafés of Paris to the hidden gems of Costa Rica's coffee farms. */}
                       {profile.about}
                       </p>

                       <h2><strong>Favorites:</strong></h2>
    <ul>
        <li><strong>Favorite Coffee Beans:</strong> Ethiopian Yirgacheffe</li>
        <li><strong>Preferred Brewing Method:</strong> Pour-over</li>
        <li><strong>Go-To Espresso:</strong> A double shot of Italian espresso</li>
        <li><strong>Morning Ritual:</strong> Sipping a freshly brewed Colombian coffee while watching the sunrise</li>
    </ul>


                            {renderComponent()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <footer className="relative bg-[#f2eada] pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
                  <p>&copy; {new Date().getFullYear()} BEANTHERE. ALL RIGHTS RESERVED.</p>

                  </div>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Profile;
