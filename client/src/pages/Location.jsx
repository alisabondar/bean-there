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
import state from '../store';

export default function Location() {
  const [loc, setLoc] = useState({ lat: '41.881832', long: '-87.623177' })
  const [zip, setZip] = useState({})
  const [cafeList, setCafeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const photos = [one, two, three, four, five];

  const fetchCafeList = async (param) => {
    const lat = param.lat || loc.lat;
    const long = param.lng || loc.long;

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
    if (e.target.value.length >= 5) {
      fetchZip(e.target.value)
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const userLoc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      setLoc(userLoc);
      fetchCafeList(userLoc);
    }, (err) => {
      console.error('Cannot find location', err)
    })
  }, [])

  let count = 1;
  const address = (name) => {
    count++;
    if (count === 21) {
      count = 0;
    }
    return <h2 className="card-title">{count}: {name}</h2>
  }


    const handleOuterClick = (e) => {
      const formDiv = document.querySelector(".locationWrapper");
      if (formDiv && !formDiv.contains(e.target)) {
        state.location = false;
      }
    };


  return (


    <div  onClick={handleOuterClick}>

    <div className='locationWrapper fixed inset-0 flex-col items-center justify-center z-50'>
<div className='top flex flex-col items-center justify-center'>
    <Toaster />
    <div className='text-3xl font-bold text-[#e7b14d] mb-4 mt-5'>Find your next brew with SipSearcher!</div>
    <div className='text-[#e7b14d] mb-6'>Get details and directions for a coffee shop nearest to you!</div>
    <div className='flex justify-center space-x-4'>
        <input
            type="text"
            placeholder="Type in a zipcode..."
            className="input w-full max-w-sm p-2 border border-gray-300 rounded"
            onChange={handleSearch}
        />
        <button className="bg-[#A98E77] text-white p-2 rounded hover:bg-[#61493C] focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            Search
        </button>
    </div>
</div>






{loading ? (
    <div className='flex justify-center items-center'>
        <span className="loading loading-dots loading-lg mt-10"></span>
    </div>
) : (
    <div className='flex space-x-3 p-5 mt-5'>
        <LocList data={cafeList} photos={photos} address={address} />
        <Map user={loc} zip={zip} count={count} cafeList={cafeList}  />
    </div>
)}


    </div>
    </div>
  );
}
