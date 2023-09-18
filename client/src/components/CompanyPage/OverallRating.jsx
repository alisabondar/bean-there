import React from "react";
import CompanyRatings from "./Progress";

const OverallRating = (prop) => {
return (
  <div className="pt-3 mt-4 flex justify-between ">
    <div className="self-center">
      <h1>OverallRating</h1>
      <h2>★★★★★</h2>
      <p className="text-xs">420 reviews</p>
    </div>
    <div className="p-4">
      <CompanyRatings rating={prop.ratings}/>
    </div>
  </div>
)
}

export default OverallRating