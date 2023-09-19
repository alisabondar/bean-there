import axios from 'axios';
import { useEffect, useState } from 'react';
import ChatGroups from '../components/Messenger/ChatGroups.jsx';
import Messages from '../components/Messenger/Messages.jsx';

var USER_ID = 1;

export default function Messenger() {
  const [room, setRoom] = useState(null);
  const loading = USER_ID === undefined;


  return loading ? (<>Loading chats...</>) : (
    <div className="flex w-full  h-screen">
      <div className="w-4/12 h-full overflow-auto max-w-[250px] min-w-[240px] bg-neutral">
        <ChatGroups id={USER_ID} setRoom={setRoom}/>
      </div>
      <div className="w-full h-full flex flex-items-end justify-end flex-col bg-primary">
        {room !== null? (
          <>
            <Messages userId={USER_ID} room={room} chatUsers={room.chat_members} />
            <div className="flex w-full h-[90px] bg-[black] items-center p-3">
              <textarea className="textarea resize-none w-[85%] h-full" placeholder="Bio"></textarea>
              <button className="btn btn-primary h-full ml-3 w-[75px]">send</button>
            </div>
          </>
        ) : <>Loading Mesages...</>}
      </div>
    </div>
  )

}
