import { useEffect, useState } from 'react';
import axios from 'axios';
import LocList from '../components/LocationPage/LocList'
import Map from '../components/LocationPage/Map'
import toast, { Toaster } from 'react-hot-toast';
import one from './img/loc1.jpeg';
import two from './img/loc2.jpeg';
import three from './img/loc3.jpeg';
import four from './img/loc4.jpeg';
import five from './img/loc5.jpeg';

export default function Location() {
  const [loc, setLoc] = useState({ lat: '41.881832', long: '-87.623177' })
  const [zip, setZip] = useState({})
  const [cafeList, setCafeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const photos = [one, two, three, four, five];

  const fetchCafeList = async (param) => {
    console.log(param);
    const lat = param.lat || loc.lat;
    const long = param.lng || loc.long;

    console.log('client url', `http://localhost:${import.meta.env.VITE_PORT}/location/search/${lat.toString()}/${long.toString()}`)

    axios.get(`http://localhost:${import.meta.env.VITE_PORT}/location/search/${lat.toString()}/${long.toString()}`)
      .then(res => {
        if (res.data.length < 1) {
          fetchCafeList('defaultData')
        } else {
          setCafeList(res.data);
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        console.error('Could not fetch user location', err);
      })
  }

  const fetchZip = async (code) => {
    axios.get(`http://localhost:${import.meta.env.VITE_PORT}/location/search/${code}`)
      .then(res => {
        setZip(res.data[0].geometry.location)
        fetchCafeList(res.data[0].geometry.location)
      })
      .catch(err => {
        console.error('Could not fetch location', err);
        toast.error('Please try again with a valid zipcode')
      })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    if (e.target.value.length >= 5) {
      fetchZip(e.target.value)
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const userLoc = {
        lat: parseFloat(pos.coords.latitude),
        lng: parseFloat(pos.coords.longitude)
      };
      setLoc(userLoc);
      fetchCafeList(userLoc);
    }, (err) => {
      console.error('Cannot find location', err)
    })
  }, [])

  return (
    <div className='bg-primary'>
      <div className='text-center p-4'>
        <Toaster />
        <div className='text-3xl'>Find your next brew with SipSearcher!</div>
        <div>Get details and directions for a coffee shop near you.</div>
        <label className='block mx-auto p-10'>Search:
          <input type="text" placeholder="Type in a zipcode ..." className="input w-full max-w-sm ml-2" onChange={handleSearch} />
        </label>
      </div>
      {loading ? (
        <div className='flex justify-center'>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className='flex flex-row'>
          <LocList data={cafeList} photos={photos} />
          <Map user={loc} zip={zip} />
        </div>
      )}
    </div>
  );
}
