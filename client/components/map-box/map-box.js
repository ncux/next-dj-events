import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from "react-geocode";

export default function MapBox({ evt }) {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewport, setViewport] = useState({
        latitude: 40.712772,
        longitude: -73.935242,
        width: '100%',
        height: '500px',
        zoom: 12
    });

    const getCoordinates = async () => {
        Geocode.fromAddress(evt.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                setLatitude(lat);
                setLongitude(lng);
                setViewport({ ...viewport, latitude: lat, longitude: lng });
                setLoading(false);
            },
            (error) => {
                console.error(error);
            }
        );
    };

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

    useEffect(() => getCoordinates(), []);

    if(loading) return false;

    return (
        <ReactMapGl { ...viewport } mapboxApiAccessToken={ process.env.NEXT_PUBLIC_MAPBOX_TOKEN } onViewportChange={ vp => setViewport(vp) }>
            <Marker key={evt.id} longitude={ longitude } latitude={ latitude }>
                <Image src='/images/pin.svg' width={30} height={30} />
            </Marker>
        </ReactMapGl>
    );
}
