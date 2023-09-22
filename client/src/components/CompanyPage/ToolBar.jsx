import React, { useState, useEffect } from "react";
import ShareForm from "./ShareModal";
// import axios from 'axios';
import axios from "../../axios-config";
import WriteReview from "./WriteReview";

export default function Toolbar({ place_id, place_name, profile }) {
  const [favorite, setFavorite] = useState(false);
  const currentPageLocationId = place_id;

  const fetchFavorite = async () => {
    try {
      const userId = profile.id;
      const res = await axios.get(`/user/${userId}/wishlist`);
      const { wishlist } = res.data;
      const filtered = wishlist.filter(
        (item) => item.location_id === currentPageLocationId
      );
      if (filtered.length > 0) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async () => {
    const userId = profile.id;
    const newStatus = !favorite;

    try {
      await axios.patch(`/user/${userId}/wishlist`, {
        user_id: userId,
        favorite: newStatus,
        location_id: currentPageLocationId,
        name: place_name,
      });
      setFavorite(newStatus);
    } catch (err) {
      console.error("Failed to update Favorite status:", err);
    }
  };

  useEffect(() => {
    fetchFavorite();
  }, [currentPageLocationId]);

  return (
    <div className="flex flex-row justify-evenly flex-wrap bg-[#f2eada] rounded-xl shadow-inner">
      <WriteReview name={place_name} />
      <div className="">
        <button
          className="btn btn-xs md:btn-sm lg:btn-md btn-secondary m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg min-w-[4rem] md:min-w-[6rem] lg:max-w-[8rem] "
          onClick={() => document.getElementById("share_modal").showModal()}
        >
          Share
        </button>
      </div>

      <dialog id="share_modal" className="modal">
        <div className="modal-box border border-secondary bg-primary">
          <ShareForm />
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("share_modal").close()}
          >
            ✕
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <button
        className={`btn btn-xs md:btn-sm lg:btn-md btn-secondary m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg min-w-[4rem] md:min-w-[6rem] lg:max-w-[8rem] ${
          favorite ? "translate-y-[1px] shadow-inner" : ""
        }`}
        onClick={toggleFavorite}
      >
        {favorite ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
}
