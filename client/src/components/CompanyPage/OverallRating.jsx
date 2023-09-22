import React from "react";
import CompanyRatings from "./Progress";
import BeanRating from "./BeanRating";

const OverallRating = (prop) => {

  function calculateAverage(ratings) {
    let totalWeightedSum = 0;
    let totalVotes = 0;

    for (const rating in ratings) {
      if (ratings.hasOwnProperty(rating)) {
        const ratingValue = parseFloat(rating);
        const voteCount = ratings[rating];
        totalWeightedSum += ratingValue * voteCount;
        totalVotes += voteCount;
      }
    }
    if (totalVotes === 0) {
      return 0;
    }
    const weightedAverage = totalWeightedSum / totalVotes;
    return weightedAverage.toFixed(1)
  }

prop.updateAvg(calculateAverage(prop.ratings))

return (
  <div className="pt-3 mt-4 flex justify-between px-2 ratingSection">
    <div className="self-center text-left overAll">
      <h1 className=" py-1">Overall Rating</h1>
      <h2 className=" py-1"><BeanRating rating={calculateAverage(prop.ratings)} /></h2>
      <p className="text-xs py-1">{`${prop.total} reviews`}</p>
    </div>
    <div className="p-4">
      <CompanyRatings rating={prop.ratings}/>
    </div>
  </div>
)
}

export default OverallRating