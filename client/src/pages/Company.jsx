import PhotoCarousel from '../components/CompanyPage/PhotoCarousel'
import Reviews from '../components/CompanyPage/Reviews';
import Toolbar from '../components/CompanyPage/ToolBar';
import InfoPanel from '../components/CompanyPage/InfoPanel';
import BeanRating from '../components/CompanyPage/BeanRating';
import Carousel from '../components/CompanyPage/Carousel';
import axios from "axios"
import { useState, useEffect } from 'react';

export default function Company() {
  const [reviews, updateReviews] = useState([{title: "Great Load",
  body: "I love loading!",
 created_at: '2023-09-16 10:00:00',
 updated_at: '2023-09-16 10:00:00',
 rating: 1,
 user_id: 1,
 location_id: 900
}])

  useEffect(() => {
    axios.get("http://localhost:3001/company/900/reviews").then((res) => {
      console.log(res.data.reviews)
      updateReviews(res.data.reviews)
    }).catch((err) => console.error)
  },[])

    const mockReviewsResult = [
    {title: "Great Coffe",
     body: "I love their coffee!",
    created_at: '2023-09-16 10:00:00',
    updated_at: '2023-09-16 10:00:00',
    rating: 1,
    user_id: 1,
    location_id: 900
  },
  {title: "Great Coffe",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 created_at: '2023-09-16 10:00:00',
 updated_at: '2023-09-16 10:00:00',
 rating: 3,
 user_id: 1,
 location_id: 900
},
{title: "Great Coffe",
body: "Yes I went here and the coffee very much tasted like coffee, it almost tasted like they got dried beans and then roasted them followed by dumping water over it and then giving me the remains.",
created_at: '2023-09-16 10:00:00',
updated_at: '2023-09-16 10:00:00',
rating: 5,
user_id: 1,
location_id: 900
},
{title: "Great Coffe",
body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
created_at: '2023-09-16 10:00:00',
updated_at: '2023-09-16 10:00:00',
rating: 4,
user_id: 1,
location_id: 900
},
{title: "Great Coffe",
body: "But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
created_at: '2023-09-16 10:00:00',
updated_at: '2023-09-16 10:00:00',
rating: 3,
user_id: 1,
location_id: 900
},
{title: "Great Coffe",
body: "But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
created_at: '2023-09-16 10:00:00',
updated_at: '2023-09-16 10:00:00',
rating: 3,
user_id: 1,
location_id: 900
},

  ]
  let mockBusiness = {
    business_status: "OPERATIONAL",
    geometry: {
        location: {
            lat: 30.5164997,
            lng: -97.6892709
        },
        viewport: {
            northeast: {
                lat: 30.51789122989272,
                lng: -97.68786802010729
            },
            southwest: {
                lat: 30.51519157010728,
                lng: -97.69056767989272
            }
        }
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
    name: "Starbucks",
    opening_hours: {
        open_now: false
    },
    photos: [
        {
            height: 1080,
            html_attributions: [
                "<a href=\"https://maps.google.com/maps/contrib/110230165512752560617\">Rachel Dornfeld</a>"
            ],
            photo_reference: "ATJ83zgAlZyOIVYznn2FwriMY3EL-mauD2Ra6kWqiH5MYPwfNlUhrpg-sGeuGlu99it5QbkEs4-eLRx6nVy8XnqnaGuGEuiS8k9zrjXIFfnqKsvNNwoAWbLdEwIKevTMQia-NrNPZmWEF_f27UdwzrwVkdm_oaLfKk6euuZOxidM4eY-KMYK",
            width: 1920
        }
    ],
    place_id: "ChIJowE4NI7RRIYRXV77fvWtKLU",
    plus_code: {
        compound_code: "G886+H7 Round Rock, Texas",
        global_code: "8624G886+H7"
    },
    price_level: 2,
    rating: 4.3,
    reference: "ChIJowE4NI7RRIYRXV77fvWtKLU",
    scope: "GOOGLE",
    types: [
        "cafe",
        "restaurant",
        "food",
        "point_of_interest",
        "store",
        "establishment"
    ],
    user_ratings_total: 678,
    vicinity: "1010 S I-35 Frontage Rd, Round Rock"
  };

  const mockImages = [
    '/assets/coffee-mock-1.jpeg',
    '/assets/coffee-mock-2.jpeg',
    '/assets/coffee-mock-3.jpeg',
    '/assets/coffee-mock-4.jpeg',
    '/assets/coffee-mock-5.jpeg',
    '/assets/coffee-mock-6.jpeg',
    '/assets/coffee-mock-7.jpeg',
  ];

  const [business, setBusiness] = useState(mockBusiness);

  return (
    <div className="flex justify-center bg-primary">
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
          <Carousel photos={mockImages}/>
        </div>

        {/* ToolBar and Reviews */}
        <div className="flex flex-wrap justify-center pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4 sm:gap-8">
            <div className="col-span-2 sm:col-span-2">
              <div className="flex-col">
                <div id="tool-bar" className="w-full h-[4rem] mt-2">
                  <Toolbar />
                </div>
                <div id="reviews" className="h-full overflow-auto">
                  <Reviews reviews={reviews}/>
                </div>
              </div>
            </div>

            {/* InfoPanel */}
            <div id="info-cards" className="sticky top-0 z-10 h-[200px]">
              <InfoPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}