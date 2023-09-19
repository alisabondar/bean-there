import React from "react";
import CompanyRatings from "./Progress";
import BeanRating from "./BeanRating";

const OverallRating = (prop) => {

return (
  <div className="pt-3 mt-4 flex justify-between px-2">
    <div className="self-center text-left">
      <h1 className=" py-1">Overall Rating</h1>
      <h2 className=" py-1"><BeanRating rating={prop.rating} /></h2>
      <p className="text-xs py-1">{`${prop.total} reviews`}</p>
    </div>
    <div className="p-4">
      <CompanyRatings rating={prop.ratings}/>
    </div>
  </div>
)
}

export default OverallRating