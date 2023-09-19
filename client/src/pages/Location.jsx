import { useEffect, useState } from 'react';
import axios from 'axios';
import LocList from '../components/LocationPage/LocList'
import Map from '../components/LocationPage/Map'

export default function Location() {
  const [loc, setLoc] = useState({lat: '41.881832',long: '-87.623177'})

  const fetch = (param) => {
    const location = param || loc;
    console.log('loc', location);

    axios.get(`http://localhost:5002/location/search/${location.lat.toString()}/${location.long.toString()}` )
      .then(res => {
        console.log('client', res);
      })
      .catch(err => {
        console.error('Could not fetch location', err)
      })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    // fetch(e.target.value)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      // console.log(pos.coords.latitude + " " + pos.coords.longitude)
      const userLoc = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      };
      setLoc(userLoc);
      fetch(userLoc);
    }, (err) => {
      console.error('Cannot find location', err)
    })
  }, [])

  return (
    <div>
      <div className='text-center p-4'>
        <div className='text-3xl'>Find your next brew with SipSearcher!</div>
        <div>Get directions and details for a coffee shop near you.</div>
        <label className='block mx-auto p-10'>Search:
          <input type="text" placeholder="Type in a zipcode ..." className="input w-full max-w-sm" onChange={handleSearch}/>
        </label>
      </div>
      <div className='flex flex-row'>
        <LocList />
        <Map />
      </div>
    </div>
  );
}
