import styles from "./ItineraryArea.module.scss";
import movingLine from "../../assets/movingLine.svg";
import homing from "../../assets/homing.svg";
import { usePocketListContext } from "../../contexts/PocketListContext";

function ItineraryArea() {
  const { pocketList } = usePocketListContext();

  return (
    <div className={styles.container}>
      <p>Itinerary Today</p>
      {pocketList.map((item) => (
        <PlaceBar
          key={item.place_id}
          placeId={item.place_id}
          placeName={item.place_name}
          placeContent={item.formatted_address}
        />
      ))}
      <img className={styles.homing} src={homing} alt="home" />
      <span> Functions in the Itinerary are developing...</span>
    </div>
  );
}

function PlaceBar({ placeName, placeContent }) {
  return (
    <div className={styles.placeBar}>
      <div className={styles.placeBox}>
        <div className={styles.placeInfo}>
          <div className={styles.placeTitle}>{placeName}</div>

          <div className={styles.placeContent}>{placeContent}</div>
        </div>
      </div>
      <img src={movingLine} alt="" />
    </div>
  );
}

export default ItineraryArea;
