import styles from "./ItineraryArea.module.scss";

function ItineraryArea() {
  return (
    <div className={styles.container}>
      The Itinerary
      <div className={styles.box}>off bed</div>
      <div className={styles.box}>having brunch</div>
      <div className={styles.box}>traveling</div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}>night</div>
    </div>
  );
}

export default ItineraryArea;
