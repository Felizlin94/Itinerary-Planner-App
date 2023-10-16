import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import { createContext, useContext, useState } from "react";

const GET_POCKETLIST = gql`
  query {
    placesPocketList {
      pocket_category
      place_id
      place_name
      formatted_address
      business_status
      opening_days
      url
      website
    }
  }
`;

const ADD_POCKETPLACE = gql`
  mutation AddPocketPlace(
    $pocket_category: String
    $place_id: String
    $place_name: String
    $formatted_address: String
    $business_status: String
    $opening_days: [String]
    $url: String
    $website: String
  ) {
    addPocketPlace(
      pocket_category: $pocket_category
      place_id: $place_id
      place_name: $place_name
      formatted_address: $formatted_address
      business_status: $business_status
      opening_days: $opening_days
      url: $url
      website: $website
    ) {
      pocket_category
      place_id
      place_name
      formatted_address
      business_status
      opening_days
      url
      website
    }
  }
`;

const UPDATE_POCKETPLACE = gql`
  mutation UpdatePocketPlace(
    $pocket_category: String
    $place_id: String!
    $place_name: String
    $formatted_address: String
    $business_status: String
    $opening_days: [String]
    $url: String
    $website: String
  ) {
    updatePocketPlaceInfo(
      pocket_category: $pocket_category
      place_id: $place_id
      place_name: $place_name
      formatted_address: $formatted_address
      business_status: $business_status
      opening_days: $opening_days
      url: $url
      website: $website
    ) {
      pocket_category
      place_id
      place_name
      formatted_address
      business_status
      opening_days
      url
      website
    }
  }
`;

const POCKETLIST_ADDED_SUBSCRIPTION = gql`
  subscription OnPocketListAdded {
    pocketListAdded {
      pocket_category
      place_id
      place_name
      formatted_address
      business_status
      opening_days
      url
      website
    }
  }
`;

const POCKETLIST_UPDATED_SUBSCRIPTION = gql`
  subscription OnPocketListUpdated {
    pocketListUpdated {
      pocket_category
      place_id
      place_name
      formatted_address
      business_status
      opening_days
      url
      website
    }
  }
`;

const REMOVE_POCKETPLACE = gql`
  mutation RemovePocketPlace($place_id: String!) {
    removePocketPlace(place_id: $place_id) {
      place_id
    }
  }
`;

const PocketListContext = createContext();

export const PocketListProvider = ({ children }) => {
  const [pocketList, setPocketList] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState();
  const [pocketListCategory, setPocketListCategory] = useState([]);
  const [addPocketPlace] = useMutation(ADD_POCKETPLACE);
  const [updatePocketPlace] = useMutation(UPDATE_POCKETPLACE);
  const [removePocketPlace] = useMutation(REMOVE_POCKETPLACE);
  const [displaying, setDisplaying] = useState("Attractions");

  const {
    loading: pocketListLoading,
    error: pocketListError,
    data: pocketListData,
  } = useQuery(GET_POCKETLIST);

  const { data: subscriptionPocketListAddedData } = useSubscription(
    POCKETLIST_ADDED_SUBSCRIPTION
  );

  const { data: subscriptionPocketListUpdatedData } = useSubscription(
    POCKETLIST_UPDATED_SUBSCRIPTION
  );

  if (pocketListLoading) {
    return <p>Loading...</p>;
  } else if (pocketListError) {
    console.error("pocketList Error:", pocketListError.message);
    return <p>Error: {pocketListError.message}</p>;
  }

  const value = {
    pocketListData,
    pocketList,
    setPocketList,
    addPocketPlace,
    updatePocketPlace,
    removePocketPlace,
    subscriptionPocketListAddedData,
    subscriptionPocketListUpdatedData,
    selectedPlace,
    setSelectedPlace,
    pocketListCategory,
    setPocketListCategory,
    displaying,
    setDisplaying,
  };

  return (
    <PocketListContext.Provider value={value}>
      {children}
    </PocketListContext.Provider>
  );
};

export const usePocketListContext = () => {
  const context = useContext(PocketListContext);
  if (!context) {
    throw new Error(
      "usePocketListContext must be used within PocketListContext"
    );
  }
  return context;
};
