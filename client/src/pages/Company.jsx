import PhotoCarousel from '../components/CompanyPage/PhotoCarousel'
import Reviews from '../components/CompanyPage/Reviews';
import Toolbar from '../components/CompanyPage/ToolBar';
import InfoPanel from '../components/CompanyPage/InfoPanel';
export default function Company() {
  return (
    <div className='min-h-screen mt-10'>
      <div className='text-4xl left-0 pt-8 pb-14'>
        <h1>Company Name Goes Here</h1>
      </div>
      <div className='mx-[5%]'>
        <PhotoCarousel />
      </div>
      <div className='flex justify-center pt-32 '>
        <div className='grid grid-cols-3 w-4/5 gap-8 h-full'>
          <div className='col-span-2 h-full'>
            <div className='flex-col'>
              <div id="tool-bar" className='bg-green-700 h-[60px] w-[600px]'>
                <Toolbar/>
              </div>
              <div id="reviews" className='h-full'>
                <Reviews />

              </div>
            </div>
          </div>
          <div id="info-cards" className='sticky top-0 z-10 h-[200px]'>
            <InfoPanel />
          </div>
        </div>
      </div>
    </div>

  );
}