import { createContext, useState } from "react";
import { useQuery, gql, useSubscription, useMutation } from "@apollo/client";
import { useUserContext } from "./UserAccountContext";

const GET_MESSAGES = gql`
  query {
    historicalMessages {
      messageId
      username
      message
      sendingTime
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage(
    $messageId: ID!
    $username: String!
    $message: String!
    $sendingTime: String!
  ) {
    sendMessage(
      messageId: $messageId
      username: $username
      message: $message
      sendingTime: $sendingTime
    ) {
      messageId
      username
      message
      sendingTime
    }
  }
`;

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    messageAdded {
      messageId
      username
      message
      sendingTime
    }
  }
`;

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messageBase, setMessageBase] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const {
    loading: messagesLoading,
    error: messagesError,
    data: messagesData,
  } = useQuery(GET_MESSAGES);
  const { data: subscriptionMessagesData } = useSubscription(
    MESSAGE_ADDED_SUBSCRIPTION
  );

  const { currentAccount } = useUserContext();

  if (messagesLoading) return <p>Loading...</p>;
  if (messagesError) return <p>Error : {messagesError.message}</p>;

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const newMessagePack = {
    messageId: messageBase.length + 1,
    username: currentAccount.username,
    message: newMessage,
    sendingTime: getCurrentTime(),
  };

  const value = {
    messageBase,
    setMessageBase,
    newMessage,
    setNewMessage,
    sendMessage,
    messagesLoading,
    messagesError,
    messagesData,
    subscriptionMessagesData,
    newMessagePack,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
