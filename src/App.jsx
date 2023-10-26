import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import { useState } from "react";
import { useUserContext } from "./contexts/UserAccountContext";
import { LoadScript } from "@react-google-maps/api";
import { useQuery, gql } from "@apollo/client";

const GET_GOOGLE_MAPS_API_KEY = gql`
  query {
    googleMapsAPIKey {
      apiKey
    }
  }
`;

function App() {
  const [page, setPage] = useState("loginPage");
  const { setOnLoginUsername, setOnLoginPassword } = useUserContext();

  const {
    loading: apiKeyLoading,
    error: apiKeyError,
    data: apiKeyData,
  } = useQuery(GET_GOOGLE_MAPS_API_KEY);

  if (apiKeyLoading) return <p>Loading...</p>;
  if (apiKeyError) return <p>Error : {apiKeyError.message}</p>;

  const MyGoogleMapsAPIKey = apiKeyData.googleMapsAPIKey[0].apiKey;

  function handleLogoutClick() {
    setPage("loginPage");
    setOnLoginUsername("");
    setOnLoginPassword("");
  }

  return (
    <LoadScript googleMapsApiKey={MyGoogleMapsAPIKey} libraries={["places"]}>
      <div className="App">
        {page === "loginPage" && <LoginPage setPage={setPage} />}
        {page === "mainPage" && <MainPage onLogoutClick={handleLogoutClick} />}
      </div>
    </LoadScript>
  );
}

export default App;
