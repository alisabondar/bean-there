import BeanRating from '../CompanyPage/BeanRating';
import { useNavigate } from 'react-router-dom';

const ShopCard = ({ shop, index, address, photos, handleRedirect }) => {
  const randomInd = Math.floor(5 * Math.random());

  return (
    <div className="flex bg-base-100 shadow-xl mb-4 p-4 max-h-56 rounded-lg">
      <figure className='w-1/4 flex-none'>
        <img src={photos[randomInd]} alt="Picture" className='w-full h-full rounded-lg' />
      </figure>
      <div className="flex-grow pl-4">
        <div className="mb-2">{address(shop, index)}</div>
        <div className="mb-2"><span>{shop.name}</span></div>
        <div className="mb-2">{shop.opening_hours && shop.opening_hours.open_now !== undefined ?
            shop.opening_hours.open_now ? "Open Now: Yes" : "Open Now: No" : "Open Now: n/a"}</div>
        <BeanRating className="mb-2" rating={shop.rating} />
        <div className="mt-2">
        <button
    onClick={() => handleRedirect(shop)}
    className="px-4 py-2 bg-[#e7b14d] text-white rounded mx-auto w-3/4 mt-3 block hover:scale-110 transition duration-300 ease-in-out"
>
    View Details
</button>

        </div>
      </div>
    </div>
  );
};

const Location = ({ data, photos, address }) => {
  const navigate = useNavigate();

  const handleRedirect = (shop) => {
    navigate(`/company/?placeId=${shop.place_id}`, { state: { data: shop } });
  };

  return (
    <div className='max-h-[350px] w-2/3 mr-6   overflow-y-auto rounded-xl hide-scrollbar'>
      {data.map((shop, index) => <ShopCard key={shop.place_id} shop={shop} index={index} address={address} photos={photos} handleRedirect={handleRedirect} />)}
    </div>
  );
}

export default Location;
