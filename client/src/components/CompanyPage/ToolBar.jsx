import { useState } from 'react';

export default function Toolbar() {

  return (
    <div className="flex flex-row space-x-4 justify-evenly m-2">

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Write Review
    </button>

    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Share
    </button>

    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
      Wish I Had Bean There
    </button>

    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Bean There
    </button>

  </div>
  );

}