import Reviews from '../components/CompanyPage/Reviews';
import Toolbar from '../components/CompanyPage/ToolBar';
import InfoPanel from '../components/CompanyPage/InfoPanel';
import BeanRating from '../components/CompanyPage/BeanRating';
import Carousel from '../components/CompanyPage/Carousel';
import axios from "axios"
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Company() {
  const [reviews, updateReviews] = useState([])
  const location = useLocation();
  const data = location.state?.data;

  useEffect(() => {
    axios.get(`http://localhost:${import.meta.env.VITE_PORT}/company/900/reviews`).then((res) => {
      console.log(res)
      updateReviews(res.data.reviews)
    }).catch((err) => console.error)
  }, []);

  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/company/${data.place_id}/details`);
        if (response.status === 200 && response.data.status === 'OK') {
          setBusiness(response.data.result);
          console.log(response.data.result);
        } else {
          console.log('Error:', response.data.status);
        }
      } catch (error) {
        console.log('Fetch Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceDetails();
  }, []);

  const mockImages = [
    '/assets/coffee-mock-1.jpeg',
    '/assets/coffee-mock-2.jpeg',
    '/assets/coffee-mock-3.jpeg',
    '/assets/coffee-mock-4.jpeg',
    '/assets/coffee-mock-5.jpeg',
    '/assets/coffee-mock-6.jpeg',
    '/assets/coffee-mock-7.jpeg',
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full relative">
      <div className="flex justify-center items-center h-full">
        <div className="min-h-screen mt-10 m-auto max-w-[67rem] min-w-[30rem] ">
          {/* Title and Ratings */}
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-2">{business.name}</h1>
            <div className="flex justify-center my-2">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <BeanRating rating={business.rating} />
                </div>
                <div className="text-2xl font-bold">
                  {business.rating}
                </div>
                <div className="text-2xl">
                  ({business.user_ratings_total} Reviews)
                </div>
              </div>
            </div>
            <div className="inline-flex items-center mb-2">
              <span className={`text-md rounded-full px-4 py-2 ${business.opening_hours.open_now ? 'bg-green-400' : 'bg-red-400'}`}>
                {business.opening_hours.open_now ? "Open" : "Closed"}
              </span>
            </div>
          </div>
          {/* PhotoCarousel */}
          <div className="mx-auto w-full max-w-[95%]">
            <Carousel photos={business.photos} />
          </div>

          {/* ToolBar and Reviews */}
          <div className="flex flex-wrap justify-center pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4 sm:gap-8">
              <div className="col-span-2 sm:col-span-2">
                <div className="flex-col">
                  <div id="tool-bar" className="w-full h-[4rem] mt-2">
                    <Toolbar place_id={business.place_id} place_name={business.name} />
                  </div>
                  <div id="reviews" className="h-full overflow-auto">
                    <Reviews reviews={reviews} rating={business.rating} />
                  </div>
                </div>
              </div>

              {/* InfoPanel */}
              <div id="info-cards" className="sticky top-0 z-10 h-[200px]">
                <InfoPanel business={business}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}