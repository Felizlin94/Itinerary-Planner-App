import styles from "./LoginPage.module.scss";
import appLogo from "../../assets/appLogo.svg";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserAccountContext";

function LoginPage({ setPage }) {
  const [showCreateUserArea, setShowCreateUserArea] = useState(false);

  const {
    userAccounts,
    setUserAccounts,
    userAccountsData,
    setCurrentAccount,
    onLoginUsername,
    setOnLoginUsername,
    onLoginPassword,
    setOnLoginPassword,
    newUsername,
    setNewUsername,
    newPassword,
    setNewPassword,
    createUser,
    newUserAccount,
  } = useUserContext();

  useEffect(() => {
    if (userAccountsData) {
      setUserAccounts(userAccountsData.defaultUserAccounts);
    }
  }, [userAccountsData, setUserAccounts]);

  function handleLoginClick() {
    const matchedAccount = userAccounts.find(
      (account) =>
        account.username === onLoginUsername &&
        account.password === onLoginPassword
    );

    if (matchedAccount) {
      setCurrentAccount(matchedAccount);
      console.log("Login Success, Welcome", matchedAccount.username);
      setTimeout(() => {
        setPage("mainPage");
      }, 50);
    } else {
      alert("Invalid Username or Password");
    }
  }

  function handleUsernameChange(event) {
    setOnLoginUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setOnLoginPassword(event.target.value);
  }

  function handleNewUsernameChange(event) {
    setNewUsername(event.target.value);
  }

  function handleNewPasswordChange(event) {
    setNewPassword(event.target.value);
  }

  function handleCreateAccountClick() {
    if (newUsername.length && newPassword.length !== 0) {
      createUser({
        variables: newUserAccount,
      })
        .then(() => {
          userAccounts.push(newUserAccount);
          setShowCreateUserArea(false);
          setNewUsername("");
          setNewPassword("");
          setOnLoginUsername(newUserAccount.username);
          setOnLoginPassword(newUserAccount.password);
        })
        .catch((error) => {
          console.error("Error creating account:", error);
        });
    }
  }

  // collapse createUerArea when acting on login area
  function handleOnLoginArea() {
    setShowCreateUserArea(false);
  }

  return (
    <div className={styles.container}>
      <img className={styles.button} src={appLogo} alt="logo" />
      <LoginArea
        onLoginClick={handleLoginClick}
        onLoginUsername={onLoginUsername}
        onLoginPassword={onLoginPassword}
        onUsernameChange={handleUsernameChange}
        onPasswordChange={handlePasswordChange}
        onLoginArea={handleOnLoginArea}
      />
      <CreateAccountArea
        newUsername={newUsername}
        newPassword={newPassword}
        onNewUsernameChange={handleNewUsernameChange}
        onNewPasswordChange={handleNewPasswordChange}
        onCreateAccountClick={handleCreateAccountClick}
        showCreateUserArea={showCreateUserArea}
        setShowCreateUserArea={setShowCreateUserArea}
      />
    </div>
  );
}

function LoginArea({
  onLoginClick,
  onLoginUsername,
  onLoginPassword,
  onUsernameChange,
  onPasswordChange,
  onLoginArea,
}) {
  return (
    <div className={styles.loginArea} onClick={onLoginArea}>
      <div className={styles.inputInfo}>
        Username :
        <input
          type="text"
          placeholder="Username"
          value={onLoginUsername}
          onChange={onUsernameChange}
          autoFocus
        />
      </div>
      <div className={styles.inputInfo}>
        Password :
        <input
          type="password"
          placeholder="Password"
          value={onLoginPassword}
          onChange={onPasswordChange}
        />
      </div>

      <div className={styles.loginBtn} onClick={onLoginClick}>
        Login to Enjoy
      </div>
    </div>
  );
}

function CreateAccountArea({
  onCreateAccountClick,
  showCreateUserArea,
  setShowCreateUserArea,
  newUsername,
  newPassword,
  onNewUsernameChange,
  onNewPasswordChange,
}) {
  function handleCreateAccountClick() {
    if (showCreateUserArea) {
      setShowCreateUserArea(false);
    } else {
      setShowCreateUserArea(true);
    }
  }

  return (
    <div className={styles.createAccountArea}>
      <div
        className={styles.toCreateAccount}
        onClick={handleCreateAccountClick}
      >
        Newcomer? Create your account in 1 minute
      </div>

      {showCreateUserArea && (
        <div className={styles.createUserInfo}>
          <div>
            Set username:
            <input
              type="text"
              placeholder="Username"
              value={newUsername}
              onChange={onNewUsernameChange}
            />
          </div>
          <div>
            Set password:
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={onNewPasswordChange}
            />
          </div>
          <button onClick={onCreateAccountClick}>Create account</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
