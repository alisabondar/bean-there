import { useState } from 'react';

export default function Toolbar() {

  return (
    <div className="bg-slate-800 rounded-md shadow-lg">

      <div className="flex flex-row justify-evenly">

        <button className="btn btn-xs md:btn-sm lg:btn-md btn-primary m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg">
          Write Review
        </button>

        <button className="btn btn-xs md:btn-sm lg:btn-md btn-accent m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg" onClick={()=>document.getElementById('share_modal').showModal()}>
          Share
        </button>

        <dialog id="share_modal" className="modal">
          <div className="modal-box border border-secondary">
            <h3 className="font-bold text-lg">Hello!</h3>
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

        <button className="btn btn-xs md:btn-sm lg:btn-md btn-accent m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg">
          Wish I Had Bean There
        </button>

        <button className="btn btn-xs md:btn-sm lg:btn-md btn-accent m-1 md:m-2 transform hover:translate-y-[-2px] hover:shadow-lg">
          Bean There
        </button>

      </div>
    </div>

  );

}