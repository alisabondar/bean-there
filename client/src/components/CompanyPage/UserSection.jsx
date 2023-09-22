import React, {useState} from "react";
import BeanRating from "./BeanRating";

const UserSection = (prop) => {
  const [ selectedBean, updateBean ] = useState(null)

  return (
    <div className="flex justify-between pt-3 mt-4 py-4 px-2 userSection">
      <div className="flex text-left items-center userName">
        <img src="https://cdn.discordapp.com/attachments/1140681171617984683/1152697648093069342/image.png" className="rounded-full w-20 object-cover h-20"></img>
        <div className="flex-col end pl-3">
          <h3>User McName</h3>
          <h2>America, USA</h2>
        </div>
      </div>
      <div >
        <BeanRating updateBean={updateBean} rating={selectedBean}/>
        <p className="beanSection">Start your review of {prop.name}</p>
      </div>
    </div>
  )
}

export default UserSection;