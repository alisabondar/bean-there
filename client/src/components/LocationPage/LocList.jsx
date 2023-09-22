import BeanRating from '../CompanyPage/BeanRating';
import { useNavigate } from 'react-router-dom';

const Location = ({ data, photos, address }) => {
  const navigate = useNavigate();

  const getImage = () => {
    const randomInd = Math.floor(5 * Math.random())
    return (
      <figure className='w-1/4 flex-none'><img src={photos[randomInd]} alt="Picture" className='w-full h-full rounded-lg' /></figure>
    )
  }

  const open = (bool) => {
    if (bool) {
      return <span>Open Now: Yes</span>
    }
    return <span>Open Now: No</span>
  }

  const handleRedirect = (data) => {
    navigate(`/company/?placeId=${data.place_id}`, { state: { data: data } });
  };

  return (
<div className='max-h-[550px] w-2/3 mr-6 pt-5 overflow-y-auto rounded-xl hide-scrollbar'>
  {data.length > 0 && data.map(shop => (
    <div className="flex bg-base-100 shadow-xl mb-4 p-4 max-h-56 rounded-lg" key={shop.place_id}>
      {getImage()}
      <div className="flex-grow pl-4"> {/* added left padding here */}
        <div className="mb-2">{address(shop.vicinity)}</div> {/* added bottom margin */}
        <div className="mb-2"><span>{shop.name}</span></div> {/* added bottom margin */}
        <div className="mb-2">
          {shop.opening_hours && shop.opening_hours.open_now !== undefined ?
            open(shop.opening_hours.open_now) : (
              <span>Open Now: n/a</span>
            )}
        </div> {/* added bottom margin */}
        <BeanRating className="mb-2" rating={shop.rating} /> {/* added bottom margin if needed */}
        <div className="mt-2">
          <button onClick={() => handleRedirect(shop)} className="btn btn-primary w-full hover:scale-110 transition duration-300 ease-in-out">View Details</button>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}

export default Location;
