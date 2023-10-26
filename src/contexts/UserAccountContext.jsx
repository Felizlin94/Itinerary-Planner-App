import { createContext, useContext, useState } from "react";
import { useQuery, gql, useSubscription, useMutation } from "@apollo/client";

const UserContext = createContext();

const GET_USER_ACCOUNTS = gql`
  query {
    defaultUserAccounts {
      userId
      username
      password
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($userId: ID!, $username: String!, $password: String!) {
    createUser(userId: $userId, username: $username, password: $password) {
      userId
      username
      password
    }
  }
`;

const USER_ACCOUNT_CREATED_SUBSCRIPTION = gql`
  subscription OnUserAccountCreated {
    userAccountCreated {
      userId
      username
      password
    }
  }
`;

export const UserProvider = ({ children }) => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [onLoginUsername, setOnLoginUsername] = useState("Qoo");
  const [onLoginPassword, setOnLoginPassword] = useState("123");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentAccount, setCurrentAccount] = useState({ username: "Qoo" });

  const [createUser] = useMutation(CREATE_USER);

  const {
    loading: userAccountsLoading,
    error: userAccountsError,
    data: userAccountsData,
  } = useQuery(GET_USER_ACCOUNTS);

  const { data: subscriptionNewAccountData } = useSubscription(
    USER_ACCOUNT_CREATED_SUBSCRIPTION
  );

  if (userAccountsLoading) return <p>Loading...</p>;
  if (userAccountsError) return <p>Error : {userAccountsError.message}</p>;

  const newUserAccount = {
    userId: userAccounts.length + 1,
    username: newUsername,
    password: newPassword,
  };

  const value = {
    userAccounts,
    setUserAccounts,
    userAccountsData,
    currentAccount,
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
    subscriptionNewAccountData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
