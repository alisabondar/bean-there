import React, {useState, useEffect} from "react";

const Pagination = (prop) => {
  return (
      <button className={prop.clicked ? "join-item btn btn-md btn-active bg-neutral border-secondary mb-2 hover:bg-neutral/[.9] border-none" : "join-item btn btn-md bg-secondary border-secondary mb-2 hover:bg-neutral/[.9] border-none"} onClick={() => {
        prop.updateIndex(prop.index)
      }}>{prop.page}</button>
  )
}

export default Pagination;