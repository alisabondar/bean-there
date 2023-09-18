import React from "react";

const UserSection = () => {
  return (
    <div className="flex justify-between pt-3 mt-4 py-4">
      <div className="flex text-left items-center">
        <img src="https://cdn.discordapp.com/attachments/1140681171617984683/1152697648093069342/image.png" className="rounded-e-full w-auto object-cover h-20"></img>
        <div className="flex-col end pl-3 ">
          <h3>User McName</h3>
          <h2>America, USA</h2>
        </div>
      </div>
      <div>
        <h1>★★★★★</h1>
        <p>Start your review of [name of company here]</p>
      </div>
    </div>
  )
}

export default UserSection;