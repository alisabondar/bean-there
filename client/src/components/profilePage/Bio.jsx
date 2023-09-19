function Bio({ about, reviews }) {
  return (
    <>
      <div>
        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
          {about ||
            "Hey there, coffee aficionados! I'm Jenna, your friendly neighborhood coffee explorer. My passion for coffee knows no bounds, and I'm always on a quest to find the perfect brew. I've embarked on coffee adventures to various corners of the world, from the bustling cafés of Paris to the hidden gems of Costa Rica's coffee farms."}
        </p>

        <h2>
          <strong>Favorites:</strong>
        </h2>
        <ul>
          <li>
            <strong>Favorite Coffee Beans:</strong> Ethiopian Yirgacheffe
          </li>
          <li>
            <strong>Preferred Brewing Method:</strong> Pour-over
          </li>
          <li>
            <strong>Go-To Espresso:</strong> A double shot of Italian espresso
          </li>
          <li>
            <strong>Morning Ritual:</strong> Sipping a freshly brewed Colombian
            coffee while watching the sunrise
          </li>
        </ul>
      </div>
      <div className="w-full lg:w-9/12 px-4 my-4 py-2 border-t border-blueGray-200 mx-auto">
        <h1>My Reviews</h1>
        {reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <div key={review.id} className="border bg-accent/[0.2] p-2 m-2">
                <p>{review.title}</p>
                <p>{review.body}</p>
                <p>{review.created_at}</p>
                <p>{review.location_name}</p>
              </div>
            );
          })
        ) : (
          <span>has no reviews</span>
        )}
      </div>
    </>
  );
}

export default Bio;
