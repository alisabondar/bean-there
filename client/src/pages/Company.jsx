import PhotoCarousel from '../components/CompanyPage/PhotoCarousel'
import Reviews from '../components/CompanyPage/Reviews';
import Toolbar from '../components/CompanyPage/ToolBar';
import InfoPanel from '../components/CompanyPage/InfoPanel';
export default function Company() {
  return (
    <div className="flex justify-center">
      <div className='min-h-screen mt-10 m-auto max-w-[67rem] min-w-[30rem] overflow-auto'>
        <div className='text-4xl left-0 pt-8 pb-14'>
          <h1>Company Name Goes Here</h1>
        </div>
        <div className='mx-auto w-full max-w-[95%]'>
          <PhotoCarousel />
        </div>
        <div className='flex flex-wrap justify-center pt-12'>
          <div className='grid grid-cols-1 sm:grid-cols-3 w-full gap-4 sm:gap-8'>
            <div className='col-span-2 sm:col-span-2'>
              <div className='flex-col'>
                <div id="tool-bar" className='w-full h-[4rem]'>
                  <Toolbar/>
                </div>
                <div id="reviews" className='h-full overflow-auto'>
                  <Reviews />
                </div>
              </div>
            </div>
            <div id="info-cards" className='sticky top-0 z-10 h-auto sm:h-[12.5rem]'>
              <InfoPanel />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}