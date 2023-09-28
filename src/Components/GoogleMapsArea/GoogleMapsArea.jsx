import styles from "./GoogleMapsArea.module.scss";
import { useQuery, gql } from "@apollo/client";
import { useState, useRef } from "react";
import {
  // GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  // Marker,
} from "@react-google-maps/api";

const GET_GOOGLE_MAPS_API_KEY = gql`
  query {
    googleMapsAPIKey {
      apiKey
    }
  }
`;

function GoogleMapsArea() {
  const {
    loading: apiKeyLoading,
    error: apiKeyError,
    data: apiKeyData,
  } = useQuery(GET_GOOGLE_MAPS_API_KEY);

  if (apiKeyLoading) return <p>Loading...</p>;
  if (apiKeyError) return <p>Error : {apiKeyError.message}</p>;

  const MyGoogleMapsAPIKey = apiKeyData.googleMapsAPIKey[0].apiKey;

  return (
    <div className={styles.container}>
      Google Map Area
      <div className={styles.mapArea}>
        <MapComponent apiKey={MyGoogleMapsAPIKey} />
      </div>
    </div>
  );
}

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const center = {
//   lat: 37.7749,
//   lng: -122.4194,
// };

function MapComponent({ apiKey }) {
  const [selected, setSelected] = useState(null);
  // const [markers, setMarkers] = useState([]);

  const searchBoxRef = useRef(null);

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();

    // const newMarkers = places.map((place) => ({
    //   position: place.geometry.location,
    // }));

    // setMarkers(newMarkers);

    // if (newMarkers.length === 1) {
    setSelected(places[0]);
    // }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <div className={styles.maptrying}>
        {/* <GoogleMap
        id="searchbox-example"
        mapContainerStyle={containerStyle}
        zoom={10}
        center={center}
      > */}
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Search Places..."
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </StandaloneSearchBox>
        {/* {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            onClick={() => setSelected(marker)}
          />
        ))} */}
        {/* </GoogleMap> */}
        <div>
          {selected && (
            <div>
              <h4>{selected.name}</h4>
              <p>{selected.types}</p>
              <p>{selected.url}</p>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
}

export default GoogleMapsArea;
