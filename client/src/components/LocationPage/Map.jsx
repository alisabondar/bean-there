import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import bean from '../../pages/img/icons8-coffee-40.png';


const Map = ({ user, zip, count, cafeList }) => {
  const key = import.meta.env.VITE_GOOGLE_KEY;
  console.log(count)

  useEffect(() => {
    let lat = zip.lat || user.lat;
    let long = zip.lng || user.lng;

    const loader = new Loader({
      apiKey: key,
      version: "weekly",
    });

    loader
      .load()
      .then(async () => {
        const { Map } = await google.maps.importLibrary("maps");

        const map = new Map(document.getElementById("map"), {
          center: { lat: lat, lng: long },
          zoom: 11,
        });

        for (let i = 0; i < 10; i++) {
          let count = i + 1;
          let marker = new google.maps.Marker({
            position: { lat: cafeList[i].geometry.location.lat, lng: cafeList[i].geometry.location.lng },
            map: map,
            icon: bean,
            label: count.toString()
          });
        }

      });

  }, [zip, cafeList]);

  return <div id="map" className="w-1/3  basis-1/2 p-5 rounded-xl shadow-xl mb-7"></div>;

};

export default Map;