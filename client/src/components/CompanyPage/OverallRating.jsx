import React from "react";

const OverallRating = () => {
return (
  <div className="bg-sky-600 pt-3 mt-4 flex justify-between ">
    <div className="self-center">
      <h1>OverallRating</h1>
      <h2>★★★★★</h2>
      <p className="text-xs">420 reviews</p>
    </div>
    <div className="p-4">
      <h3> 5 star   ⬛  ⬛  ⬛  ⬛  ⬜  </h3>
      <h3> 4 star   ⬛  ⬛  ⬛  ⬜  ⬜  </h3>
      <h3> 3 star   ⬛  ⬛  ⬜  ⬜  ⬜  </h3>
      <h3> 2 star   ⬛  ⬜  ⬜  ⬜  ⬜  </h3>
      <h3> 1 star   ⬛  ⬜  ⬜  ⬜  ⬜  </h3>
    </div>
  </div>
)
}

export default OverallRating