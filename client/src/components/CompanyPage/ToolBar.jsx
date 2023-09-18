import { useState } from 'react';

export default function Toolbar() {

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
            <h3 className="font-bold text-lg">Hello!</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById('share_modal').close()}
            >
                ✕
            </button>
          </div>
        </dialog>

        <button
          className="btn btn-xs md:btn-sm lg:btn-md btn-primary m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg min-w-[4rem] md:min-w-[6rem] lg:max-w-[8rem]"
        >
          Wish I Had Bean There
        </button>

        <button
          className="btn btn-xs md:btn-sm lg:btn-md btn-primary m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg min-w-[4rem] md:min-w-[6rem] lg:max-w-[8rem]"
        >
          Bean There
        </button>
      </div>
    </div>
  );

}