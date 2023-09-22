import { FaStar } from "react-icons/fa";
import { CiCoffeeBean } from "react-icons/ci";
import { Link } from "react-router-dom";

function Favs({ wishlist }) {
  return (
    <div className="w-full lg:w-9/12 px-4 mx-auto">
      <h1 className="text-3xl">
        <span className="flex items-center justify-center gap-4">
          <FaStar />
          Favorites
        </span>
      </h1>
      {wishlist.length > 0 ? (
        wishlist.map((item) => {
          return (
            <div
              key={item.id}
              className="border bg-accent/[0.2] p-2 m-2 rounded-md shadow-md hover:bg-primary"
            >
              <a
                href={`http://localhost:5173/company/?placeId=${item.location_id}`}
                target="_blank"
                className="flex justify-center items-center gap-4 text-xl"
              >
                <CiCoffeeBean className="text-bold text-accent text-2xl" />
                <span>{item.location_name}</span>
              </a>
            </div>
          );
        })
      ) : (
        <div className="lg:py-36">
          <Link
            to="/location"
            className="text-xl shadow-md hover:scale-110 block bg-primary p-2 rounded-full hover:bg-neutral hover:text-base-100"
          >
            Search for some favorites here!
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favs;
