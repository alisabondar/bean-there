import { useEffect, useState, useRef } from "react";
import axios from "axios";
import LocList from "../components/LocationPage/LocList";
import Map from "../components/LocationPage/Map";
import toast, { Toaster } from "react-hot-toast";
import one from "./img/loc1.jpeg";
import two from "./img/loc2.jpeg";
import three from "./img/loc3.jpeg";
import four from "./img/loc4.jpeg";
import five from "./img/loc5.jpeg";
import state from "../store";
import filterIcon from "./img/filter.png";

export default function Location() {
  const [loc, setLoc] = useState({ lat: "41.881832", long: "-87.623177" });
  const [zip, setZip] = useState({});
  const [cafeList, setCafeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const photos = [one, two, three, four, five];
  const wrapperRef = useRef(null);

  const fetchCafeList = async (param, filter) => {
    const lat = param.lat || loc.lat;
    const long = param.lng || loc.lng;

    setCafeList([])
    if (filter === undefined) {
      setLoading(true);
      axios
        .get(
          `http://localhost:${import.meta.env.VITE_PORT
          }/location/search/${lat.toString()}/${long.toString()}`
        )
        .then((res) => {
          if (res.data.length < 1) {
            fetchCafeList(loc);
          } else {
            setCafeList(res.data);
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error("Could not fetch user location", err);
        });
    } else {
      setLoading(true);
      axios
        .get(
          `http://localhost:${import.meta.env.VITE_PORT
          }/location/search/${lat.toString()}/${long.toString()}/${filter}`
        )
        .then((res) => {
          if (res.data.length < 1) {
            fetchCafeList(loc);
          } else {
            setCafeList(res.data);
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error("Could not fetch user location", err);
        });
    }
  };

  const fetchZip = async (code) => {
    axios
      .get(
        `http://localhost:${import.meta.env.VITE_PORT}/location/search/${code}`
      )
      .then((res) => {
        setZip(res.data[0].geometry.location);
        fetchCafeList(res.data[0].geometry.location);
      })
      .catch((err) => {
        console.error("Could not fetch location", err);
        toast.error("Please try again with a valid zipcode");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value.length >= 5) {
      fetchZip(e.target.value);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLoc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLoc(userLoc);
        fetchCafeList(userLoc);
      },
      (err) => {
        console.error("Cannot find location", err);
      }
    );
  }, []);

  const address = (shop, ind) => {
    ind += 1;
    let name = shop.vicinity || shop.formatted_address;
    return (
      <h2 className="card-title">
        {ind}: {name}
      </h2>
    );
  };



  const handleFilter = async (e) => {
    const filter = e.currentTarget.getAttribute("data-name");
    if (filter === "relevance") {
      if (zip) {
        fetchCafeList(zip);
      } else {
        fetchCafeList();
      }
    } else if (filter === "distance") {
      if (zip) {
        fetchCafeList(zip, "distance");
      } else {
        fetchCafeList(loc, "distance");
      }
    } else {
      // wishlist
      const userId = state.active;
      if (userId === 0 || userId === undefined) {
        toast.error("Please login to see your wishlist.");
      } else {
        setWishlist(true);
        try {
          const wishlistRes = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/user/${userId}/wishlist`)
          const data = wishlistRes.data.wishlist;
          const places = [];

          for (let i = 0; i < data.length; i++) {
            try {
              const placeRes = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/company/${data[i].location_id}/details`);
              places.push(placeRes.data.result);
            } catch (err) {
              console.error('Cannot fetch place ids', err)
            }
          }
          setCafeList(places.filter(place => place !== null));
        } catch (err) {
          console.error('Cannot fetch wishlist', err)
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOuterClick);

    return () => {
      document.removeEventListener('mousedown', handleOuterClick);
    };
  }, []);

  const handleOuterClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      state.location = false;
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handlepopClick);

    return () => {
      document.removeEventListener('mousedown', handlepopClick);
    };
  }, []);

  const handlepopClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setFilterOpen(false);
    }
  };




  return (


    <div >

      <div ref={wrapperRef} className='locationWrapper fixed inset-0 flex-col items-center justify-center z-50'>
        <div className='top flex flex-col items-center justify-center'>
          <Toaster />
          <div className="text-3xl font-bold text-[#e7b14d] mb-4 mt-5">
            Find your next brew with SipSearcher!
          </div>
          <div className="text-[#e7b14d] mb-6">
            Get details and directions for a coffee shop nearest to you!
          </div>
          <div className="flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Type in a zipcode..."
              className="input w-full max-w-sm p-2 border border-gray-300 rounded"
              onChange={handleSearch}
            />
            <div className="dropdown">

              <button tabIndex={0}
                style={{ display: "flex", alignItems: "center" }}
                className=" bg-[#A98E77] text-white  font-bold py-3 px-5 pr-7 rounded hover:bg-[#61493C]   hover:scale-110 transition duration-300 ease-in-out">
                <img
                  src={filterIcon}
                  alt="Filter Icon"
                  className="mr-3 h-4 w-4"
                />
                Filter
              </button>

              <ul
                tabIndex={0}
                className="dropdown-content z-[100] menu p-2 shadow bg-base-100 rounded-box w-52 ${filterOpen ? 'open' : ''} "
              >
                <li>
                  <a
                    onClick={(e) => {
                      handleFilter(e);
                    }}
                    data-name="relevance"
                  >
                    Relevance
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      handleFilter(e);
                    }}
                    data-name="distance"
                  >
                    Proximity
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      handleFilter(e);
                    }}
                    data-name="wishlist"
                  >
                    Wishlist
                  </a>
                </li>
              </ul>
            </div>
            <button className="bg-[#A98E77] text-white font-bold py-2 px-6 rounded hover:bg-[#61493C]  hover:scale-110 transition duration-300 ease-in-out
            "
              style={{ outline: 'none' }}>
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-lg mt-10"></span>
          </div>
        ) : (
          <div className="flex space-x-3 p-5 mt-5">
            <LocList data={cafeList} photos={photos} address={address} />
            <Map user={loc} zip={zip} cafeList={cafeList} wishlist={wishlist}/>
          </div>
        )}
      </div>
    </div>
  );
}
