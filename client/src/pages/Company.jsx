import Reviews from "../components/CompanyPage/Reviews";
import Toolbar from "../components/CompanyPage/ToolBar";
import InfoPanel from "../components/CompanyPage/InfoPanel";
import BeanRating from "../components/CompanyPage/BeanRating";
import Carousel from "../components/CompanyPage/Carousel";
import NavBar from "./NavBar.jsx";
import axios from "../axios-config";
// import axios from "axios";
import { useState, useEffect } from "react";
import state from "../store";

export default function Company() {
  const [reviews, updateReviews] = useState([]);
  const [avgRating, updateAvg] = useState(0);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios
      .get(`/user/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        if (!state.active) {
          state.active = true;
        }
        setProfile(res.data);
      })
      .catch(() => {
        console.log("error getting profile");
      });
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get("placeId");
    axios
      .get(`/company/${placeId}/reviews`, { withCredentials: true })
      .then((res) => {
        updateReviews(res.data.reviews);
      })
      .catch((err) => console.error);
  }, []);

  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async (placeId) => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/company/${placeId}/details`, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.status === "OK") {
          setBusiness(response.data.result);
          console.log("Success:", response.data.result);
        } else {
          console.log("Server responded but not OK:", response.data.status);
        }
      } catch (error) {
        console.log("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get("placeId");
    if (placeId) {
      fetchPlaceDetails(placeId);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full relative bg-[#f2eada] shadow-crawl ">
      <NavBar />
      <div className="flex justify-center items-center h-full px-4 md:px-0 mx-5 ">
        <div className="flex flex-col items-center mt-10 mx-auto w-full max-w-screen-2xl ">
          {/* Title and Ratings */}
          <div className="flex flex-col items-center w-full">
            <h1 className="text-5xl font-bold mb-2">{business.name}</h1>
            <div className="flex justify-center my-2">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <BeanRating rating={avgRating} />
                </div>
                <div className="text-2xl font-bold">{avgRating}</div>
                <div className="text-2xl">({reviews.length} Reviews)</div>
              </div>
            </div>
            <div className="inline-flex items-center mb-2">
              <span
                className={`text-md rounded-full px-4 py-2  ${
                  business.opening_hours.open_now
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              >
                {business.opening_hours.open_now ? "Open" : "Closed"}
              </span>
            </div>
          </div>
          {/* PhotoCarousel */}

          <div className="mx-auto w-full max-w-[95%] sm:max-w-full shadow-float rounded-2xl">
            <div className="carousel-float">
              <Carousel photos={business.photos} />
            </div>
          </div>

          {/* ToolBar and Reviews */}
          <div className="flex justify-center pt-12 w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4 sm:gap-8 testGrid justify-center items-center">
              <div className="col-span-2 sm:col-span-2 smallScreen">
                <div className="flex-col">
                  <div
                    id="tool-bar"
                    className="toolbar-bg w-full h-[8rem] mt-2 relative z-[2]"
                  >
                    <div className="absolute inset-0 flex justify-center items-end rounded-lg bg-opacity-50">
                      <div className="w-8/12 h-full flex justify-center items-center z-[2]">
                        <Toolbar
                          place_id={business.place_id}
                          place_name={business.name}
                          profile={profile}
                        />
                      </div>
                    </div>
                  </div>
                  <div id="reviews" className="h-full overflow-auto">
                    <Reviews
                      reviews={reviews}
                      updateAvg={updateAvg}
                      name={business.name}
                      profile={profile}
                    />
                  </div>
                </div>
              </div>
              {/* InfoPanel */}
              <div
                id="info-cards"
                className=" h-full sticky top-0 z-10 max-w-[32rem]"
              >
                  <InfoPanel business={business} profile={profile}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
