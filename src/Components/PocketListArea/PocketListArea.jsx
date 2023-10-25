import styles from "./PocketListArea.module.scss";
import attractionsIcon from "../../assets/attractions.svg";
import foodndrinks from "../../assets/foodndrinks.svg";
import othersIcon from "../../assets/othersIcon.svg";
import house from "../../assets/house.svg";
// import searchIcon from "../../assets/searchIcon.svg";
// import plus from "../../assets/plus.svg";
// import filterIcon from "../../assets/filterIcon.svg";
import remove from "../../assets/remove.svg";
import cancelButton from "../../assets/cancelButton.svg";
import editPencil from "../../assets/editPencil.svg";
import saveIcon from "../../assets/saveIcon.svg";
import train from "../../assets/train.svg";
import { useEffect, useState } from "react";
import { usePocketListContext } from "../../contexts/PocketListContext";

function PocketListArea() {
  const {
    pocketListData,
    pocketList,
    setPocketList,
    displaying,
    setDisplaying,
  } = usePocketListContext();

  // const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (pocketListData) {
      setPocketList(pocketListData.placesPocketList);
    }
  }, [pocketListData, setPocketList]);

  function handleListBtnClick(listName) {
    setDisplaying(`${listName}`);
  }

  // const handleSearchTextChange = (event) => {
  //   setSearchText(event.target.value);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.listEntryArea}>
          <ListSelectButton
            svg={attractionsIcon}
            listName="Attractions"
            displaying={displaying}
            onListBtnClick={handleListBtnClick}
          />
          <ListSelectButton
            svg={train}
            listName="Transportation"
            displaying={displaying}
            onListBtnClick={handleListBtnClick}
          />
          <ListSelectButton
            svg={foodndrinks}
            listName="Food & Drinks"
            displaying={displaying}
            onListBtnClick={handleListBtnClick}
          />
          <ListSelectButton
            svg={house}
            listName="Lodgings"
            displaying={displaying}
            onListBtnClick={handleListBtnClick}
          />
          <ListSelectButton
            svg={othersIcon}
            listName="Others"
            displaying={displaying}
            onListBtnClick={handleListBtnClick}
          />
        </div>
        {/* searchBar function to be developed... */}
        {/* <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search in Pocket List..."
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <img src={searchIcon} alt="button" />
          <img src={filterIcon} alt="button" />
        </div> */}
      </div>
      <div className={styles.pocketList}>
        {pocketList
          .filter((place) => place.pocket_category === displaying)
          .map((item) => (
            <PlaceBar
              key={item.place_id}
              placeId={item.place_id}
              placeName={item.place_name}
              placeContent={item.formatted_address}
            />
          ))}
      </div>
    </div>
  );
}

function ListSelectButton({ displaying, onListBtnClick, svg, listName }) {
  return (
    <div className={styles.listSelectButton}>
      <img
        className={`${styles.button} ${
          displaying === listName ? styles.displaying : ""
        }`}
        src={svg}
        alt="button"
        onClick={() => onListBtnClick(listName)}
      />
      <p>{listName}</p>
    </div>
  );
}

function PlaceBar({ placeId, placeName, placeContent }) {
  const { pocketList, updatePocketPlace, removePocketPlace } =
    usePocketListContext();
  const [editMode, setEditMode] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [newPlaceContent, setNewPlaceContent] = useState("");

  function handleEditClick() {
    setEditMode(true);
    setNewPlaceName(placeName);
    setNewPlaceContent(placeContent);
  }

  function handleSaveClick() {
    if (newPlaceName.length === 0) {
      alert("Please enter place name");
    } else {
      const index = pocketList.findIndex((place) => place.place_id === placeId);

      updatePocketPlace({
        variables: {
          ...pocketList[index],
          place_id: placeId,
          place_name: newPlaceName,
          formatted_address: newPlaceContent,
        },
      })
        .then(() => {
          setEditMode(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function handleCancelEditClick() {
    setEditMode(false);
    setNewPlaceName("");
    setNewPlaceContent("");
  }

  function handleRemovePlaceClick() {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this place?"
    );

    if (isConfirmed) {
      removePocketPlace({
        variables: {
          place_id: placeId,
        },
      });

      const indexToRemove = pocketList.findIndex(
        (place) => place.place_id === placeId
      );
      pocketList.splice(indexToRemove, 1);
    }
  }

  const handlePlaceNameChange = (event) => {
    setNewPlaceName(event.target.value);
  };
  const handlePlaceContentChange = (event) => {
    setNewPlaceContent(event.target.value);
  };

  return (
    <div className={styles.placeBar}>
      {/* <img src={plus} alt="button" />  */}
      <div className={styles.placeBox}>
        <div className={styles.placeInfo}>
          {editMode === true ? (
            <input
              className={styles.editPlaceTitle}
              type="text"
              value={newPlaceName}
              onChange={handlePlaceNameChange}
            />
          ) : (
            <div className={styles.placeTitle}>{placeName}</div>
          )}
          {editMode === true ? (
            <input
              className={styles.editPlaceContent}
              type="text"
              value={newPlaceContent}
              onChange={handlePlaceContentChange}
            />
          ) : (
            <div className={styles.placeContent}>{placeContent}</div>
          )}
        </div>
        {editMode === true ? (
          <>
            <img
              className={styles.editBtn}
              src={saveIcon}
              alt="button"
              onClick={handleSaveClick}
            />
            <img
              className={styles.cancelEditBtn}
              src={cancelButton}
              alt="button"
              onClick={handleCancelEditClick}
            />
          </>
        ) : (
          <img
            className={styles.editBtn}
            src={editPencil}
            alt="button"
            onClick={handleEditClick}
          />
        )}
      </div>
      <img
        className={styles.removePlaceBtn}
        src={remove}
        alt="button"
        onClick={handleRemovePlaceClick}
      />
    </div>
  );
}

export default PocketListArea;
