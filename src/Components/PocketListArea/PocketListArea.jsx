import styles from "./PocketListArea.module.scss";
import attractions from "../../assets/attractions.svg";
import foodndrinks from "../../assets/foodndrinks.svg";
import othersIcon from "../../assets/othersIcon.svg";
import house from "../../assets/house.svg";
import searchIcon from "../../assets/searchIcon.svg";
import plus from "../../assets/plus.svg";
import xButton from "../../assets/x-button.svg";
import editPencil from "../../assets/editPencil.svg";
import filterIcon from "../../assets/filterIcon.svg";
import train from "../../assets/train.svg";
import down from "../../assets/down.svg";
import { useState } from "react";

function PocketListArea() {
  const [searchText, setSearchText] = useState("");
  const [displaying, setDisplaying] = useState(true);

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  function handleListEntryBtnClick() {
    console.log("123");
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.listEntryArea}>
          <ListEntryButtons
            svg={attractions}
            listName="Attractions"
            displaying={displaying}
            onListEntryBtnClick={handleListEntryBtnClick}
          />
          <ListEntryButtons svg={train} listName="Transportation" />
          <ListEntryButtons svg={foodndrinks} listName="Food & Drinks" />
          <ListEntryButtons svg={house} listName="Accommodation" />
          <ListEntryButtons svg={othersIcon} listName="Others" />
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleTextChange}
          />
          <img src={searchIcon} alt="button" />
          <img src={filterIcon} alt="button" />
        </div>
      </div>
      <div className={styles.listArea}>
        {exampleDataset.map((item) => (
          <PlaceBar
            key={item.id}
            placeTitle={item.title}
            placeContent={item.content}
          />
        ))}
      </div>
    </div>
  );
}

function ListEntryButtons({ displaying, onListEntryBtnClick, svg, listName }) {
  return (
    <div className={styles.listEntryButton}>
      <div
        className={`${styles.button} ${displaying ? styles.displaying : ""}`}
        onClick={onListEntryBtnClick}
      >
        <img src={svg} alt="button" />
      </div>
      <p>{listName}</p>
    </div>
  );
}

function PlaceBar({ placeTitle }) {
  return (
    <div className={styles.placeBar}>
      <img src={plus} alt="button" />
      <div className={styles.placeBox}>
        <div className={styles.placeTitle}>{placeTitle}</div>
        <div className={styles.barFunctions}>
          <img className={styles.showContent} src={down} alt="button" />
          <img className={styles.toEdit} src={editPencil} alt="button" />
        </div>
      </div>
      <img src={xButton} alt="button" />
    </div>
  );
}

const exampleDataset = [
  {
    id: 1,
    title: "澳洲國立博物館",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
  {
    id: 2,
    title: "澳洲國立",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
  {
    id: 3,
    title: "澳洲博物館的",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
  {
    id: 4,
    title: "國立博物館",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
  {
    id: 5,
    title: "abcdefghijklmnopqrstwz",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
  {
    id: 6,
    title: "雪梨附近博物館",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
  {
    id: 7,
    title: "博物館",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
  {
    id: 8,
    title: "雪梨附近博物館，不是歌劇院",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
  {
    id: 9,
    title: "abcdefghijklmnopqrs",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
  {
    id: 10,
    title: "雪梨附近博物館",
    content: "靠近雪梨歌劇院，澳洲最古老的博物館，建於 1827 年，展出許多展品",
  },
];

export default PocketListArea;
