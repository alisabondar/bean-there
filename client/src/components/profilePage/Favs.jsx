function Favs({ wishlist }) {
  return (
    <div className="w-full lg:w-9/12 px-4 mx-auto">
      <h1>My Wishlist</h1>
      {wishlist.length > 0 ? (
        wishlist.map((item) => {
          return (
            <div key={item.id} className="border bg-accent/[0.2] p-2 m-2">
              <p>{item.location_name}</p>
            </div>
          );
        })
      ) : (
        <span>has no wishlist</span>
      )}
    </div>
  );
}

export default Favs;
