import { createContext } from "react";

const userAccounts = [
  {
    Id: 1,
    Username: "Snoopy",
    Password: "123",
  },
  {
    Id: 2,
    Username: "Anya",
    Password: "123",
  },
  {
    Id: 3,
    Username: "Qoo",
    Password: "123",
  },
];

const UserContext = createContext("");

export { userAccounts, UserContext };
