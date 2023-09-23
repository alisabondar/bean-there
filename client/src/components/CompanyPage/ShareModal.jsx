const ShareForm = () => {

  const currentURL = window.location.href;

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`, '_blank');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}`, '_blank');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const message = e.target.message.value;
  };

  return (
    <div className="">
      <button
        id="shareFacebook"
        className="px-4 py-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleFacebookShare}
      >
        Share on Facebook
      </button>
      <button
        id="shareTwitter"
        className="px-4 py-2 m-2 bg-blue-400 text-white rounded hover:bg-blue-500"
        onClick={handleTwitterShare}
      >
        Share on Twitter
      </button>
      <hr className="my-4"/>
      <div id="currentURL" className="text-base">
        <span className="font-bold">{currentURL}</span>
      </div>
      <hr className="my-4"/>
      <form id="customShareForm" onSubmit={handleFormSubmit}>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Friend's Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full px-2 py-1 border rounded mt-1"
        />
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mt-4">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full px-2 py-1 border rounded mt-1"
        />
        <button
          type="submit"
          className="px-4 py-2 mt-4 bg-neutral text-white rounded hover:bg-accent"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ShareForm;
