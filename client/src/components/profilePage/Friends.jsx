function Friends({ friends }) {
  return (
    <div className="w-full lg:w-9/12 px-4 mx-auto">
      <h1>My Friends</h1>
      {friends.length > 0 ? (
        friends.map((friend) => {
          return (
            <div key={friend.id} className="border bg-accent/[0.2] p-2 m-2">
              <p>{friend.location_name}</p>
            </div>
          );
        })
      ) : (
        <span>Search for more Brew Buds!</span>
      )}
    </div>
  );
}

export default Friends;
