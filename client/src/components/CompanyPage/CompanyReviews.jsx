import React from "react";
import BeanRating from "./BeanRating";
import moment from "moment"

const CompanyReviews = (prop) => {
  console.log(prop)
  const date = prop.reviewData.updated_at
 return (
  <div className=" my-4 py-3">
    <div className="flex text-left items-center">
      <img src="https://cdn.discordapp.com/attachments/1140681171617984683/1152697648093069342/image.png" className="rounded-full w-20 h-20 object-cover"></img>
      <div className="flex-col end pl-3 ">
      <h3>{`User Mc${prop.reviewData.user_id}`}</h3>
      <p className="pt-1">{moment(date).format("MMM Do YYYY")}</p>
      </div>
    </div>
    <div>
      <div className="w-fit pt-4 pb-3">
      <BeanRating rating={prop.reviewData.rating} />
      </div>
    <div className="py-4">
      <p>{prop.reviewData.body}</p>
    </div>
    </div>
  </div>
 )
}

export default CompanyReviews;

