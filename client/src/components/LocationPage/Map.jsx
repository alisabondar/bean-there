import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = ({ user, zip }) => {
  const key = import.meta.env.VITE_GOOGLE_KEY;

  useEffect(() => {
    const loader = new Loader({
      apiKey: key,
      version: "weekly",
    });

    loader.load().then(async () => {
      let lat = zip.lat || user.lat;
      let long = zip.lng || user.long;
      console.log('map', lat, long)

      const { Map } = await google.maps.importLibrary("maps");

      const map = new Map(document.getElementById("map"), {
        center: { lat: lat, lng: long },
        zoom: 11,
      });
    });
  }, [key, zip]);

  return <div id="map" className="basis-1/2" style={{ height: "500px" }}></div>;
};

export default Map;