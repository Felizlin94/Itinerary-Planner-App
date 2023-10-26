import styles from "./GoogleMapsArea.module.scss";
import attractionsIcon from "../../assets/attractions.svg";
import foodndrinks from "../../assets/foodndrinks.svg";
import othersIcon from "../../assets/othersIcon.svg";
import house from "../../assets/house.svg";
import train from "../../assets/train.svg";

import { useRef } from "react";
import {
  // GoogleMap,
  StandaloneSearchBox,
  // Marker,
} from "@react-google-maps/api";
import { usePocketListContext } from "../../contexts/PocketListContext";

function GoogleMapsArea() {
  return (
    <div className={styles.container}>
      <span>Google Maps Places Search</span>
      <div className={styles.mapArea}>
        <PlacesSearch />
      </div>
    </div>
  );
}

// const containerStyle = {
//   width: "300px",
//   height: "300px",
// };

// const center = {
//   lat: 37.7749,
//   lng: -122.4194,
// };

function PlacesSearch() {
  const {
    pocketList,
    addPocketPlace,
    selectedPlace,
    setSelectedPlace,
    setDisplaying,
  } = usePocketListContext();
  // const [markers, setMarkers] = useState([]);

  const searchBoxRef = useRef(null);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places) {
      setSelectedPlace(places[0]);
    }
    // const newMarkers = places.map((place) => ({
    //   position: place.geometry.location,
    // }));
    // setMarkers(newMarkers);
    // if (newMarkers.length === 1) {
    //   setSelectedPlace(places[0]);
    // }
  };

  function handleAddBtnClick(listName) {
    const newPlacePack = {
      pocket_category: `${listName}`,
      place_id: selectedPlace.place_id ?? pocketList.length,
      place_name: selectedPlace.name ?? "",
      formatted_address: selectedPlace.formatted_address ?? "",
      business_status: selectedPlace.business_status ?? "",
      opening_days: selectedPlace.opening_hours?.weekday_text ?? "",
      url: selectedPlace.url ?? "",
      website: selectedPlace.website ?? "",
    };

    if (
      pocketList.find((places) => places.place_id === newPlacePack.place_id)
    ) {
      alert("The place_id already exists in the pocketList");
    } else {
      addPocketPlace({
        variables: newPlacePack,
      })
        .then(() => {
          pocketList.push(newPlacePack);
          setDisplaying(newPlacePack.pocket_category);
        })
        .catch((error) => {
          console.error("Error adding pocket place:", error);
        });
    }
  }

  return (
    <div className={styles.placesSearchArea}>
      {/* <GoogleMap
          id="searchbox-example"
          mapContainerStyle={containerStyle}
          zoom={10}
          center={center}
        > */}
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          placeholder="Search Places..."
          className={styles.searchBoxInput}
        />
      </StandaloneSearchBox>
      {/* {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              onClick={() => setSelectedPlace(marker)}
            />
          ))} */}
      {/* </GoogleMap> */}
      {selectedPlace && (
        <div className={styles.placeInfos}>
          <p className={styles.placeName}>
            Place Name: <span>{selectedPlace.name}</span>
          </p>
          <p className={styles.placAddress}>
            Address: <span>{selectedPlace.formatted_address}</span>
          </p>
          {selectedPlace.business_status !== "OPERATIONAL" && (
            <h5>{selectedPlace.business_status}</h5>
          )}
          {/* ) : ( */}
          <div className={styles.addBar}>
            <p> Add this place to pockets :</p>
            <div className={styles.buttons}>
              <AddToListButtons
                svg={attractionsIcon}
                listName="Attractions"
                onAddBtnClick={handleAddBtnClick}
              />
              <AddToListButtons
                svg={train}
                listName="Transportation"
                onAddBtnClick={handleAddBtnClick}
              />
              <AddToListButtons
                svg={foodndrinks}
                listName="Food & Drinks"
                onAddBtnClick={handleAddBtnClick}
              />
              <AddToListButtons
                svg={house}
                listName="Lodgings"
                onAddBtnClick={handleAddBtnClick}
              />
              <AddToListButtons
                svg={othersIcon}
                listName="Others"
                onAddBtnClick={handleAddBtnClick}
              />
            </div>
          </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
}

function AddToListButtons({ onAddBtnClick, svg, listName }) {
  return (
    <div className={styles.listsButton}>
      <div className={styles.button} onClick={() => onAddBtnClick(listName)}>
        <img src={svg} alt="button" />
      </div>
      <p>{listName}</p>
    </div>
  );
}

export default GoogleMapsArea;
