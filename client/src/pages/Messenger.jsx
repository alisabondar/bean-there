import axios from "axios";
import { useEffect, useState } from "react";
import ChatGroups from "../components/Messenger/ChatGroups.jsx";
import Messages from "../components/Messenger/Messages.jsx";

import { NavLink } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { GrReturn } from "react-icons/gr";

var USER_ID = 1;
const url = "http://localhost:5001/messenger/";

export default function Messenger({ id }) {
  const [room, setRoom] = useState(null);
  const loading = id === undefined;
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");

  var getChats = (id, data) => axios.post(url + `rooms/${id}/messages/`, data);

  var handleSend = () => {
    console.log("try send");
    getChats(room.id, {
      message_text: message,
      message_user: USER_ID,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  var handleChange = (e) => {
    setMessage(e.target.value);
  };

  return loading ? (
    <>Loading chats...</>
  ) : (
    <div className="flex w-full h-[80vh] bg-secondary/[0.7]">
      <div className="w-4fu h-full overflow-auto max-w-[250px] min-w-[240px] border-r border-accent  bg-stripes">
        <div className="flex justify-between mt-2 mx-1 items-center bg-secondary p-2 rounded-md  shadow ">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a room..."
            className="w-[90%] rounded-full px-1 focus:outline-none"
          />
          <FaSearch className="text-base-100 text-lg" />
        </div>
        <ChatGroups id={id} setRoom={setRoom} search={search} />
      </div>
      <div className="w-full h-full flex flex-items-end justify-end flex-col bg-primary bg-stripes">
        {room ? (
          <>
            <Messages userId={id} room={room} chatUsers={room.chat_members} />
            <div className="flex w-full h-[50-px] bg-primary border-t border-accent bg-stripes items-center py-2 px-3">
              <textarea
                onChange={handleChange}
                className="textarea resize-none w-full h-[50%]"
                placeholder={`Message ${room.chat_name}`}
              ></textarea>
              <button
                onClick={handleSend}
                className="btn btn-secondary ml-3 w-[75px] shadow  hover:btn-accent"
              >
                send
              </button>
            </div>
          </>
        ) : (
          <>Loading Messages...</>
        )}
      </div>
    </div>
  );
}
