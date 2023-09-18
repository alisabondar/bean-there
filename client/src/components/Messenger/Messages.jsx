import axios from 'axios';
import { useEffect, useState } from 'react';

const testChat = (userId, message, key) => {
  return (
    <div key={key} className={`chat chat-${message.message_user === userId ? 'start' : 'end'}`}>
      <div className="chat-image avatar">
        <div className="w-10">
          <img src="" />
        </div>
      </div>
      <div className="chat-header">
        {message.message_user} |
        <time className="text-xs opacity-50"> {message.created_at}</time>
      </div>
      <div className="chat-bubble">{message.message_text}</div>
    </div>
  );
}

const url = 'http://localhost:5000/messenger/'

var Messages = ({ userId, roomId }) => {
  const [messages, setMessages] = useState([]);

  var getMessages = (id) => axios.get(url + `rooms/${id}/messages/`);

  useEffect(() => {
    console.log('get room', roomId)
    getMessages(roomId).then(result => {
      console.log(result.data);
      var msgs = result.data.messages;
      setMessages(msgs.map((m) => ({
        id: m.id,
        created_at: m.created_at,
        message_text: m.message_text,
        message_user: m.message_user,
      })));
    }).catch(err => {
      console.log(err);
    })
  }, [roomId])

  return (
    <div className="flex w-full overflow-auto justify-start flex-col-reverse flex-items-end">
      {messages.map((m, i) => (
        testChat(userId, m, i)
      ))}
    </div>
  )
}

export default Messages;

