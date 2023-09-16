import PhotoCarousel from '../components/CompanyPage/PhotoCarousel'
import Reviews from '../components/CompanyPage/Reviews';

export default function Company() {
  return (
    <div className='mh-screen mx-10'>
    <div className='text-4xl left-0 pt-8 pb-14'>
      <h1>Company Name Goes Here</h1>
      </div>
    <div className='mx-[1%]'>
      <PhotoCarousel/>
    </div>
    <div className='flex justify-center pt-32 '>
    <div className='grid  grid-cols-3 grid-rows-2 gap-4 w-4/5'>
      <div id="tool-bar" className='bg-green-700 col-span-2 '>
      <p>Tool Bar</p>
      </div>
      <div id="info-cards" className='bg-green-700'>
      <p>info cards</p>
      </div>
      <Reviews />
    </div>
    </div>
    </div>
  );
}