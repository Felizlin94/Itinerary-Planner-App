import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import { useEffect, useState } from "react";

import { useQuery, gql } from "@apollo/client";

const GET_USER_ACCOUNTS = gql`
  query {
    userAccounts {
      Username
      Password
    }
  }
`;

function App() {
  const [page, setPage] = useState("mainPage");
  const [currentAccount, setCurrentAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    loading: userAccountsLoading,
    error: userAccountsError,
    data: userAccountsData,
  } = useQuery(GET_USER_ACCOUNTS);

  //Set up a default account user to help check existing user's experience
  useEffect(() => {
    if (userAccountsData) {
      const defaultUser = userAccountsData.userAccounts.find(
        (account) => account.Username === "Qoo"
      );
      setCurrentAccount(defaultUser);
      setUsername(defaultUser.Username);
      setPassword(defaultUser.Password);
    }
  }, [userAccountsData]);

  if (userAccountsLoading) return <p>Loading...</p>;
  if (userAccountsError) return <p>Error : {userAccountsError.message}</p>;

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLoginClick() {
    const matchedAccount = userAccountsData.userAccounts.find(
      (account) =>
        account.Username === username && account.Password === password
    );

    if (matchedAccount) {
      setCurrentAccount(matchedAccount);
      console.log("Login Success, Welcome", matchedAccount.Username);
      setTimeout(() => {
        setPage("mainPage");
      }, 50);
    } else {
      alert("Invalid Username or Password");
    }
  }

  function handleLogoutClick() {
    setUsername("");
    setPassword("");
    setPage("loginPage");
  }

  return (
    <div className="App">
      {page === "loginPage" && (
        <LoginPage
          onLoginClick={handleLoginClick}
          userAccounts={userAccountsData.userAccounts}
          username={username}
          password={password}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
        />
      )}
      {page === "mainPage" && (
        <MainPage
          currentAccount={currentAccount}
          onLogoutClick={handleLogoutClick}
        />
      )}
    </div>
  );
}

export default App;
