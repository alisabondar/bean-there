import React, { useState, useEffect } from 'react';
import ShareForm from './ShareModal';
import axios from 'axios';

export default function Toolbar({ place_id, place_name }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [beanThere, setBeanThere] = useState(false);
  const currentPageLocationId = place_id;

  const fetchWishlisted = async () => {
    try {
      const userId = 1;
      const res = await axios.get(`http://localhost:5000/user/${userId}/wishlist`);
      const { wishlist } = res.data;
      const filtered = wishlist.filter(item => item.location_id === currentPageLocationId);
      console.log(wishlist)
      if (filtered.length > 0) {
        const item = filtered[0];
        setWishlisted(!!item.wishlisted);
        setBeanThere(!!item.visited);
      } else {
        setWishlisted(false);
        setBeanThere(false);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const toggleWishlisted = async () => {
    const userId = 1;
    const newStatus = !wishlisted;

    try {
      await axios.patch(`http://localhost:5000/user/${userId}/wishlist`, {
        user_id: userId,
        wishlisted: newStatus,
        location_id: currentPageLocationId,
        name: place_name
      });
      setWishlisted(newStatus);
    } catch (err) {
      console.error("Failed to update wishlisted status:", err);
    }
  };

  const toggleVisited = async () => {
    const userId = 1;
    const newStatus = !beanThere;

    try {
      await axios.patch(`http://localhost:5000/user/${userId}/wishlist`, {
        user_id: userId,
        visited: newStatus,
        location_id: currentPageLocationId,
        name: place_name
      });
      setBeanThere(newStatus);
    } catch (err) {
      console.error("Failed to update visited status:", err);
    }
  };

  useEffect(() => {
    fetchWishlisted();
  }, [currentPageLocationId]);




  return (
    <div className="bg-neutral rounded-md shadow-lg">
      <div className="flex flex-row justify-evenly flex-wrap">
        <button
          className="btn btn-xs md:btn-sm lg:btn-md btn-primary m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg min-w-[4rem] md:min-w-[6rem] lg:max-w-[8rem]"
        >
          Write Review
        </button>
        <button
          className="btn btn-xs md:btn-sm lg:btn-md btn-primary m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg min-w-[4rem] md:min-w-[6rem] lg:max-w-[8rem]"
          onClick={()=>document.getElementById('share_modal').showModal()}
        >
          Share
        </button>

        <dialog id="share_modal" className="modal">
          <div className="modal-box border border-secondary bg-primary">
            <ShareForm/>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById('share_modal').close()}
            >
                ✕
            </button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <button
          className={`btn btn-xs md:btn-sm lg:btn-md btn-primary m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg min-w-[4rem] md:min-w-[6rem] lg:max-w-[8rem] ${wishlisted ? 'wishlisted-class' : ''}`}
          onClick={toggleWishlisted}
        >
          Wish I Had Bean There
        </button>

        <button
          className={`btn btn-xs md:btn-sm lg:btn-md btn-primary m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg min-w-[4rem] md:min-w-[6rem] lg:max-w-[8rem] ${beanThere ? 'beanThere-class' : ''}`}
          onClick={toggleVisited}
        >
          Bean There
        </button>
      </div>
    </div>
  );

}