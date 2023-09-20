import axios from 'axios';
import { useEffect, useState } from 'react';
import ChatGroups from '../components/Messenger/ChatGroups.jsx';
import Messages from '../components/Messenger/Messages.jsx';

var USER_ID = 1;
const url = 'http://localhost:5000/messenger/'

export default function Messenger() {
  const [room, setRoom] = useState(null);
  const loading = USER_ID === undefined;
  const [message, setMessage] = useState('');

  var getChats = (id, data) => axios.post(url + `rooms/${id}/messages/`, data);

  var handleSend = () => {
    console.log('try send');
    getChats(room.id,
      {
        message_text: message,
        message_user: USER_ID
      }
      ).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err)
    })
  }
  var handleChange = (e) => {
    setMessage(e.target.value);
  }

  return loading ? (<>Loading chats...</>) : (
    <div className="flex w-full  h-screen">
      <div className="w-4/12 h-full overflow-auto max-w-[250px] min-w-[240px] bg-neutral border-r-2 border-accent">
        <div className="grid pt-5 grid-cols-1 justify-items-center">
          <ChatGroups id={USER_ID} setRoom={setRoom}/>
        </div>
      </div>
      <div className="w-full h-full flex flex-items-end justify-end flex-col bg-primary">
        {room !== null? (
          <>
            <Messages userId={USER_ID} room={room} chatUsers={room.chat_members} />
            <div className="flex w-full h-[50-px] bg-[black] items-center p-3">
              <textarea onChange={handleChange} className="textarea resize-none w-[65%] h-[50%]" placeholder={`Message ${room.chat_name}`}></textarea>
              <button onClick={handleSend} className="btn btn-primary h-full ml-3 max-w-[75px] h-[50%]">send</button>
            </div>
          </>
        ) : <>Loading Mesages...</>}
      </div>
    </div>
  )

}
