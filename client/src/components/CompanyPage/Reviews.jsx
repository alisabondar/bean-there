import React, {useState, useEffect} from "react";
import UserSection from "./UserSection";
import OverallRating from "./OverallRating";
import CompanyReviews from "./CompanyReviews";
import Pagination from "./Pagination";

export default function Reviews(prop) {

  const [curIndex, updateIndex] = useState(0)
  const reviewsPerPage = 5
  const endIndex = (curIndex + reviewsPerPage)
  const reviewsRendered = prop.reviews.slice(curIndex,endIndex)


  const ratings = (reviewData) => {
    var ratings = {5:0, 4:0, 3:0, 2:0, 1:0}
    for ( var i =0; i < reviewData.length; i ++) {
        ratings[reviewData[i].rating]++
    }
    return ratings
  }
  return (
    <div className=' col-span-2 mb-16 divide-y text-center'>
      <UserSection />
      <OverallRating ratings={ratings(prop.reviews)}/>
      {reviewsRendered.map((elem, index) => {
            return (
              <div key={index} className="text-left">
              <CompanyReviews key={index} reviewData={elem}/>
              </div>
            )
      })}
      <div className="join">
        {Array.from({ length: Math.ceil(prop.reviews.length / reviewsPerPage ) }).map((_, index) => {
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
