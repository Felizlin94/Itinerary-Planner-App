import { useState } from "react";
import styles from "./MainPage.module.scss";
import PocketListArea from "../PocketListArea/PocketListArea";
import ItineraryArea from "../ItineraryArea/ItineraryArea";
import GoogleMapsArea from "../GoogleMapsArea/GoogleMapsArea";
import Chatroom from "../Chatroom/Chatroom";
import logout from "../../assets/box-arrow-right.svg";

function MainPage({ onLogoutClick }) {
  const [area1, setArea1] = useState("PocketListArea");
  const [area2, setArea2] = useState("GoogleMapsArea");

  return (
    <div className={styles.container}>
      {area1 === area2 ? (
        <div className={styles.singleAreaMode}>
          <SubArea area={area1} />
          <Buttons setArea={setArea2} />
        </div>
      ) : (
        <div className={styles.doubleAreaMode}>
          <div className={styles.area1}>
            <SubArea area={area1} />
            <Buttons setArea={setArea1} />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.area2}>
            <Buttons setArea={setArea2} />
            <SubArea area={area2} />
          </div>
        </div>
      )}
      <div className={styles.logoutBtn}>
        <img src={logout} alt="logout" onClick={onLogoutClick} />
        <span>To logout</span>
      </div>
    </div>
  );
}

function SubArea({ area }) {
  return (
    <div className={styles.subArea}>
      {area === "PocketListArea" && <PocketListArea />}
      {area === "ItineraryArea" && <ItineraryArea />}
      {area === "GoogleMapsArea" && <GoogleMapsArea />}
      {area === "Chatroom" && <Chatroom />}
    </div>
  );
}

function Buttons({ setArea }) {
  function handlethe1Click() {
    setArea("PocketListArea");
    console.log("Welcome to PocketList Area");
  }
  function handlethe2Click() {
    setArea("ItineraryArea");
    console.log("Welcome to Itinerary Area");
  }
  function handlethe3Click() {
    setArea("GoogleMapsArea");
    console.log("Welcome to GoogleMaps Area");
  }
  function handlethe4Click() {
    setArea("Chatroom");
    console.log("Welcome to Chatroom");
  }

  return (
    <div className={styles.buttons}>
      <div className={styles.button} onClick={handlethe1Click}>
        Pocket Lists
      </div>
      <div className={styles.button} onClick={handlethe2Click}>
        The Itinerary
      </div>
      <div className={styles.button} onClick={handlethe3Click}>
        Google Map
      </div>
      <div className={styles.button} onClick={handlethe4Click}>
        Chatroom
      </div>
    </div>
  );
}

export default MainPage;
