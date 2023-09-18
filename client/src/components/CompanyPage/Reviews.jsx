import React, {useState, useEffect} from "react";
import UserSection from "./UserSection";
import OverallRating from "./OverallRating";
import CompanyReviews from "./CompanyReviews";
import Pagination from "./Pagination";

export default function Reviews(prop) {

  const originalTest = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,7,18,19,20,21]
  const [curIndex, updateIndex] = useState(0)
  const reviewsPerPage = 5
  const endIndex = (curIndex + reviewsPerPage)
  const reviewsRendered = originalTest.slice(curIndex,endIndex)

  return (
    <div className=' col-span-2 mb-16 divide-y'>
      <UserSection />
      <OverallRating />
      {reviewsRendered.map((elem, index) => {
            return (
              <div key={index}>
              <CompanyReviews key={index} text={elem}/>
              </div>
            )
      })}
      <div className="join">
        {Array.from({ length: Math.ceil(originalTest.length / reviewsPerPage ) }).map((_, index) => {
            return <Pagination
            page={index + 1}
            key={index}
            index={(index  * reviewsPerPage)}
            clicked={(index  * reviewsPerPage) === curIndex ? true : false}
            updateIndex={updateIndex}/>
        })}
      </div>
    </div>

  )
}
