import { FaCoffee } from "react-icons/fa";

function Friends({ friends }) {
  return (
    <div className="w-full lg:w-9/12 px-4 mx-auto">
      <h1 className="text-3xl">
        <span className="flex items-end justify-center gap-4">
          <FaCoffee />
          BrewBuds
        </span>
      </h1>
      {friends.length > 0 ? (
        friends.map((friend) => {
          return (
            <div
              key={friend.id}
              className="border bg-accent/[0.2] p-2 m-2 rounded-md shadow-md hover:bg-primary cursor-pointer"
            >
              <p>{friend["users.username"]}</p>
            </div>
          );
        })
      ) : (
        <div className="lg:p-36">
          <span className="whitespace-nowrap text-lg">
            Search for more Brew Buds!
          </span>
        </div>
      )}
    </div>
  );
}

export default Friends;
