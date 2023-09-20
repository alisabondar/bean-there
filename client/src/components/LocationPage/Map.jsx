import { Loader } from "@googlemaps/js-api-loader"

const Map = () => {
  const key = import.meta.env.VITE_GOOGLE_KEY;
  console.log(key);

  const loader = new Loader({
    apiKey: key,
    version: "weekly",
  });

  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });

  // let map;
  // const chicago = { lat: 41.85, lng: -87.65 };

  // /**
  //  * Creates a control that recenters the map on Chicago.
  //  */
  // function createCenterControl(map) {
  //   const controlButton = document.createElement("button");

  //   // Set CSS for the control.
  //   controlButton.classList.add('buttonStyle');

  //   controlButton.textContent = "Center Map";
  //   controlButton.title = "Click to recenter the map";
  //   controlButton.type = "button";
  //   // Setup the click event listeners: simply set the map to Chicago.
  //   controlButton.addEventListener("click", () => {
  //     map.setCenter(chicago);
  //   });
  //   return controlButton;
  // }

  // function initMap() {
  //   map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 7,
  //     center: { lat: 49.496675, lng: -102.65625 },
  //   });

  //   var georssLayer = new google.maps.KmlLayer({
  //     url: "http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss",
  //   });
  //   georssLayer.setMap(map);

  //   // Create the DIV to hold the control.
  //   const centerControlDiv = document.createElement("div");
  //   // Create the control.
  //   const centerControl = createCenterControl(map);

  //   // Append the control to the DIV.
  //   centerControlDiv.appendChild(centerControl);
  //   map.controls[google.maps.ControlPosition.TOP_CENTER].push(
  //     centerControlDiv
  //   );
  // }

  // window.initMap = initMap;


  return (
  <div className='basis-1/2'>

  </div>
  );
}

export default Map;