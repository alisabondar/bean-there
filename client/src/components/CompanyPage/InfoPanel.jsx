import { useState, useEffect } from "react";
import axios from "axios";



export default function InfoPanel( {business} ) {

  function stripHTMLTags(input) {
    return input ? input.replace(/<\/?[^>]+(>|$)/g, "") : '';
  }


  return (
    <div className="mx-auto p-5 mt-2 bg-neutral rounded-box border-accent border-[1rem]">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">Business Details</h2>
        <a href={business.website} className="hover:underline mb-4 block">Visit Coffee Shop Website</a>
        <hr className="my-4" />
        <p className="mb-4">{stripHTMLTags(business.adr_address)}</p>
        <hr className="my-4" />
        <p>{business.formatted_phone_number}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Store Hours</h2>
        <ul>
          {business.current_opening_hours.weekday_text.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}