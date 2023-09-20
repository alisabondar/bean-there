import BeanRating from '../CompanyPage/BeanRating';

const Location = ({ data, photos }) => {

  const getImage = () => {
    const randomInd = Math.floor(5 * Math.random())

    return (
      <figure className='w-1/4'><img src={photos[randomInd]} alt="Picture" className='w-full h-auto'/></figure>
    )
  }

  const open = (bool) => {
    if (bool) {
      return <span>Open Now: Yes</span>
    }
    return <span>Open Now: No</span>
  }

  return (
    <div className='basis-1/2' >
      {data.length > 0 &&
        data.map(shop => (
          <div className="card lg:card-side bg-base-100 shadow-xl" key={shop.place_id}>
            {getImage()}
            <div className="card-body">
              <h2 className="card-title">{shop.vicinity}</h2>
              <span>{shop.name}</span>
              {open(shop.opening_hours.open_now)}
              <BeanRating rating={shop.rating} />
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Location;