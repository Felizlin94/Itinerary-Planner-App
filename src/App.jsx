import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import { useState } from "react";
import { useUserContext } from "./contexts/UserAccountContext";

function App() {
  const [page, setPage] = useState("mainPage");
  const { setOnLoginUsername, setOnLoginPassword } = useUserContext();

  function handleLogoutClick() {
    setPage("loginPage");
    setOnLoginUsername("");
    setOnLoginPassword("");
  }

  return (
    <div className="App">
      {page === "loginPage" && <LoginPage setPage={setPage} />}
      {page === "mainPage" && <MainPage onLogoutClick={handleLogoutClick} />}
    </div>
  );
}

export default App;
