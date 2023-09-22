import React, { useState } from 'react';

export default function InfoPanel( {business} ) {
  const [showDetails, setShowDetails] = useState(false);
  function stripHTMLTags(input) {
    return input ? input.replace(/<\/?[^>]+(>|$)/g, "") : '';
  }

  return (
    <div className="info-panel-container">
      <div>
          <button
              className="md:hidden block bg-primary py-2 px-4 rounded-box mb-4 ml-10"
              onClick={() => setShowDetails(!showDetails)}
          >
              View Business Details
          </button>

          <div className={`business-details mx-auto p-2 sm:p-4 md:p-5 mt-2 bg-primary rounded-box md:block ${showDetails ? 'block' : 'hidden'}`}>
              <div className="border-b pb-2 sm:pb-4 mb-2 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Business Details</h2>
                  <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words hover:underline mb-2 sm:mb-4 block">
                      {business.website}
                  </a>
                  <hr className="my-2 sm:my-4" />
                  <p className="mb-2 sm:mb-4">{stripHTMLTags(business.adr_address)}</p>
                  <hr className="my-2 sm:my-4" />
                  <p>{business.formatted_phone_number}</p>
              </div>

              <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Store Hours</h2>
                  <ul>
                      {business.current_opening_hours.weekday_text.map((day, index) => (
                          <li key={index} className="mb-1 sm:mb-2">{day}</li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
  </div>


  );
}
