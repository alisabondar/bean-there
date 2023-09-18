import React, {useState, useEffect} from "react";

const Pagination = (prop) => {
  return (
      <button className={prop.clicked ? "join-item btn btn-md btn-active" : "join-item btn btn-md"} onClick={() => {
        prop.updateIndex(prop.index)
      }}>{prop.page}</button>
  )
}

export default Pagination;