import styles from "./LoginPage.module.scss";

import { useState } from "react";

function LoginPage({
  onLoginClick,
  userAccounts,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
}) {
  const [showCreateUserArea, setShowCreateUserArea] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function handleNewUsernameChange(event) {
    setNewUsername(event.target.value);
  }

  function handleNewPasswordChange(event) {
    setNewPassword(event.target.value);
  }

  function handleCreateAccountClick() {
    if (newUsername.length && newPassword.length !== 0) {
      userAccounts.push({
        Username: newUsername,
        Password: newPassword,
      });
      setShowCreateUserArea(false);
      setNewUsername("");
      setNewPassword("");
    } else {
      return;
    }
  }

  // collapse createUerArea when acting on login area
  function handleOnLoginArea() {
    setShowCreateUserArea(false);
  }

  return (
    <div className={styles.container}>
      <LoginArea
        onLoginClick={onLoginClick}
        username={username}
        password={password}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
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
  username,
  password,
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
          value={username}
          onChange={onUsernameChange}
          autoFocus
        />
      </div>
      <div className={styles.inputInfo}>
        Password :
        <input
          type="password"
          placeholder="Password"
          value={password}
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
