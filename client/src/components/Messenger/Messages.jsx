import axios from 'axios';
import { useEffect, useState } from 'react';

const testChat = (userId, message, userMap, key) => {
  const user = userMap[message.message_user];
  return (
    <div key={key} className={`chat chat-${message.message_user === userId ? 'start' : 'end'}`}>
      <div className="chat-image avatar">
        <div className="w-10">
          <img src={`${user.photo}`} />
        </div>
      </div>
      <div className="chat-header">
        {user.username} |
        <time className="text-xs opacity-50"> {message.created_at}</time>
      </div>
      <div className="chat-bubble">{message.message_text}</div>
    </div>
  );
}

const buildUserMap = (chatUsers) => {
  var userMap = {};
  chatUsers.forEach(user => {
    userMap[user.user_id] = {
      photo: user.users.photo,
      username: user.users.username
    }
  })
  return userMap;
}

const url = 'http://localhost:5000/messenger/'

var Messages = ({ userId, room, chatUsers }) => {
  const [messages, setMessages] = useState([]);
  const [userMap, setUserMap] = useState({});

  var getMessages = (id) => axios.get(url + `rooms/${id}/messages/`);

  useEffect(() => {
    setUserMap(buildUserMap(chatUsers))
    getMessages(room.id).then(result => {
      var msgs = result.data.messages;
      setMessages(msgs.map((m) => ({
        created_at: m.created_at,
        message_text: m.message_text,
        message_user: m.message_user,
      })));
    }).catch(err => {
      console.log(err);
    })
  }, [room])

  return (
    <div className="flex w-full overflow-auto justify-start flex-col-reverse flex-items-end">
      {messages.map((m, i) => (
        testChat(userId, m, userMap, i)
      ))}
    </div>
  )
}

export default Messages;

