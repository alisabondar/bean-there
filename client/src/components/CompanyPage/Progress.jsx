import React, {useEffect, useState} from "react";

const CompanyRatings = (prop) => {

  const [ratings, updateRatings] = useState(prop.rating)

  useEffect(() => {
    const totalSum = Object.values(prop.rating).reduce((acc, val) => acc + val, 0);

    // Initialize an empty result object to store the rounded percentages
    const result = {};

    // Calculate and store the rounded percentage for each key
    for (const key in prop.rating) {
      if (prop.rating.hasOwnProperty(key)) {
        const value = prop.rating[key];
        // Calculate the percentage based on the total sum and round it
        const percentage = Math.round((value / totalSum) * 100);
        result[key] = percentage;
      }
    }

    // Find the highest percentage
    const maxPercentage = Math.max(...Object.values(result));

    // Calculate the adjustment factor
    const adjustmentFactor = 100 / maxPercentage;

    // Adjust all percentages accordingly
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        result[key] *= adjustmentFactor;
      }
    }
    updateRatings(result);
  },[prop.rating])

  return (
    <div className="progressGrid grid grid-cols-5 grid-rows-5 gap-4 items-center ">
      <div className="col-start-1 row-start-5">1 star</div>
      <div className="col-start-1 row-start-4">2 stars</div>
      <div className="col-start-1 row-start-3">3 stars</div>
      <div className="col-start-1 row-start-2">4 stars</div>
      <div className="col-start-1 row-start-1">5 stars</div>
      <progress className="progress w-96 col-span-4 col-start-2 row-start-1" value={ratings[5]} max="100"></progress>
      <progress className="progress w-96 col-span-4 col-start-2 row-start-2" value={ratings[4]} max="100"></progress>
      <progress className="progress w-96 col-span-4 col-start-2 row-start-3" value={ratings[3]} max="100"></progress>
      <progress className="progress w-96 col-span-4 col-start-2 row-start-4" value={ratings[2]} max="100"></progress>
      <progress className="progress w-96 col-span-4 col-start-2 row-start-5" value={ratings[1]} max="100"></progress>
    </div>

  )
}

export default CompanyRatings;