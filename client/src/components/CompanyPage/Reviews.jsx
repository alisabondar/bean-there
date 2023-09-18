import React from "react";
import UserSection from "./UserSection";
import OverallRating from "./OverallRating";
import CompanyReviews from "./CompanyReviews";

export default function Reviews() {
  return (
    <div className='bg-green-700 col-span-2 mb-16'>
      <UserSection />
      <OverallRating />
      <CompanyReviews />
    </div>

  )
}
