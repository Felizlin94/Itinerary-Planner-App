import styles from "./Chatroom.module.scss";
import iconSendMessage from "../../assets/sendMessage.svg";
import addImage from "../../assets/addImage.svg";
import addEmoji from "../../assets/addEmoji.svg";

import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_MESSAGES = gql`
  query {
    historicalMessages {
      Username
      Message
      SendingTime
    }
  }
`;

function Chatroom({ currentAccount }) {
  const [messageBase, setMessageBase] = useState([]);

  const { loading, error, data } = useQuery(GET_MESSAGES);

  useEffect(() => {
    if (data) {
      setMessageBase(data.historicalMessages);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={styles.container}>
      <p>
        <span>{currentAccount.Username}</span> in <span>Chatroom</span>
      </p>
      <div className={styles.chatArea}>
        {messageBase.map((messages, index) => {
          return messages.Username === currentAccount.Username ? (
            <SelfMessage
              key={index}
              message={messages.Message}
              sendingTime={messages.SendingTime}
            />
          ) : (
            <FriendMessage
              key={index}
              message={messages.Message}
              sendingTime={messages.SendingTime}
            />
          );
        })}
      </div>
      <LaunchArea />
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
function FriendMessage({ message, sendingTime }) {
  return (
    <div className={styles.friendMessage}>
      <div className={styles.avatar}> </div>
      <div className={styles.messageAndTime}>
        <div className={styles.message}>{message}</div>
        <div className={styles.sendingTime}>{sendingTime}</div>
      </div>
    </div>
  );
}

function LaunchArea() {
  return (
    <div className={styles.launchArea}>
      <img className={styles.addImage} src={addImage} alt="avatar" />
      <input type="text" alt="not available yet..." />
      <img className={styles.sendMessage} src={iconSendMessage} alt="avatar" />
      <img className={styles.addEmoji} src={addEmoji} alt="avatar" />
    </div>
  );
}

export default Chatroom;
