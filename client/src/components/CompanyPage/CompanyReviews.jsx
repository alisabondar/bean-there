import React from "react";

const CompanyReviews = (prop) => {
 return (
  <div className=" my-4 py-4">
    <div className="flex text-left items-center">
      <img src="https://cdn.discordapp.com/attachments/1140681171617984683/1152697648093069342/image.png" className="rounded-e-full w-auto h-20"></img>
      <div className="flex-col end pl-3 ">
      <h3>User McName</h3>
      <p>★★★★★ 01/02/2023</p>
      </div>
    </div>
    <div className="py-4">
      <p>{prop.text}</p>
    </div>
  </div>
 )
}

export default CompanyReviews;

