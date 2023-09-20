import React, {useState, useEffect} from "react";

const Pagination = (prop) => {
  return (
      <button className={prop.clicked ? "join-item btn btn-md btn-active bg-secondary border-secondary mb-2" : "join-item btn btn-md bg-secondary border-secondary mb-2"} onClick={() => {
        prop.updateIndex(prop.index)
      }}>{prop.page}</button>
  )
}

export default Pagination;