
export default function BeanRating ({ rating }) {

  const beanImagePath = "/assets/uncolored-bean.png";

  const fullBeans = Math.floor(rating);
  const partialFill = (rating % 1) * 100;

  const beans = [];

  for (let i = 1; i <= 5; i++) {
    let innerDivStyle = {};
    if (i === fullBeans + 1) {
      innerDivStyle = { width: `${partialFill}%` };
    }

    const beanStyle = {
      backgroundImage: `url(${beanImagePath})`,
      backgroundSize: 'cover',
    };

    beans.push(
      <div
        key={i}
        className={`relative w-7 h-7 rounded`}
      >
        {i === fullBeans + 1 && (
          <div
            style={innerDivStyle}
            className="absolute inset-y-0 left-0 z-10 bg-yellow-950 rounded"
          ></div>
        )}
        <div
          style={beanStyle}
          className={`absolute inset-0 bg-cover bg-center rounded z-20 ${i <= fullBeans ? 'bg-yellow-950' : 'bg-transparent'}`}
        ></div>
      </div>
    );
  }

  return (

      <div className="flex space-x-1 justify-center">
        {beans}
      </div>

  );
}


