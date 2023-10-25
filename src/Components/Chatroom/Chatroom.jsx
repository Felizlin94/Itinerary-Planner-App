import styles from "./Chatroom.module.scss";
import iconSendMessage from "../../assets/sendMessage.svg";
import addImage from "../../assets/addImage.svg";
import addEmoji from "../../assets/addEmoji.svg";

import { useContext, useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { MessageContext } from "../../contexts/MessageContext";
import { useUserContext } from "../../contexts/UserAccountContext";

function Chatroom() {
  const {
    messageBase,
    setMessageBase,
    newMessage,
    setNewMessage,
    sendMessage,
    messagesData,
    subscriptionMessagesData,
    newMessagePack,
  } = useContext(MessageContext);
  const { currentAccount } = useUserContext();

  useEffect(() => {
    if (messagesData) {
      setMessageBase(messagesData.historicalMessages);
    }
  }, [messagesData, setMessageBase]);

  useEffect(() => {
    if (subscriptionMessagesData) {
      setMessageBase((prevMessages) => [
        ...prevMessages,
        subscriptionMessagesData.messageAdded,
      ]);
    }
  }, [subscriptionMessagesData, setMessageBase]);

  function handleSendMessage() {
    if (newMessage) {
      sendMessage({
        variables: newMessagePack,
      })
        .then(() => {
          setNewMessage("");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  function presentLocalTime(sendingTime, offset) {
    const [hours, minutes] = sendingTime.split(":");
    const adjustedHours = (parseInt(hours) + offset) % 24;
    return `${adjustedHours.toString().padStart(2, "0")}:${minutes}`;
  }

  return (
    <div className={styles.container}>
      <p>
        <span>{currentAccount.username}</span> in <span>Chatroom</span>
      </p>
      <ScrollToBottom className={styles.chatArea}>
        {messageBase.map((messages) => {
          const adjustedSendingTime = presentLocalTime(messages.sendingTime, 8);

          return messages.username === currentAccount.username ? (
            <SelfMessage
              key={messages.messageId}
              message={messages.message}
              sendingTime={adjustedSendingTime}
            />
          ) : (
            <FriendMessage
              key={messages.messageId}
              FriendName={messages.username}
              message={messages.message}
              sendingTime={adjustedSendingTime}
            />
          );
        })}
      </ScrollToBottom>
      <LaunchArea
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSendMessage={handleSendMessage}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

function SelfMessage({ message, sendingTime }) {
  return (
    <div className={styles.selfMessage}>
      <div className={styles.message}>{message}</div>
      <div className={styles.sendingTime}>{sendingTime}</div>
    </div>
  );
}
function FriendMessage({ FriendName, message, sendingTime }) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    import(`../../assets/${FriendName}.png`)
      .then((module) => setAvatar(module.default))
      .catch(() => setAvatar(require("../../assets/Kirby.png")));
  }, [FriendName]);

  return (
    <div className={styles.friendMessage}>
      <img className={styles.avatar} src={avatar} alt={FriendName} />
      <div className={styles.messageAndTime}>
        <div className={styles.message}>{message}</div>
        <div className={styles.sendingTime}>{sendingTime}</div>
      </div>
    </div>
  );
}

function LaunchArea({ newMessage, setNewMessage, onSendMessage, onKeyDown }) {
  return (
    <div className={styles.launchArea}>
      <img className={styles.addImage} src={addImage} alt="addImage" />
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <img
        className={styles.sendMessage}
        src={iconSendMessage}
        alt="iconSendMessage"
        onClick={onSendMessage}
      />
      <img className={styles.addEmoji} src={addEmoji} alt="addEmoji" />
    </div>
  );
}

export default Chatroom;
