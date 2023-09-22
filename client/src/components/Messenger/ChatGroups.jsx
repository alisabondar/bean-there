// import axios from "axios";
import axios from "../../axios-config";
import { useEffect, useState } from "react";

const testGroup = (room, key, changeRoom) => {
  return (
    <div key={key}>
      {key !== 0 ? <div className="m-3"></div> : <div></div>}
      <div
        className="w-full text-white flex px-2 items-start justify-center flex-col bg-[black]/[0.45] shadow color-[white] cursor-pointer h-[100px] rounded-2xl"
        onClick={changeRoom}
      >
        <p className="font-bold">{room.chat_name}</p>
        {room.chat_members.map((m, i) => (
          <p key={i} className="text-xs">
            {m.users.username}
            {i + 1 !== room.chat_members.length ? <>,</> : <></>}
          </p>
        ))}
      </div>
    </div>
  );
};
const url = "/messenger/";

var ChatGroups = ({ id, setRoom, search }) => {
  const [rooms, setRooms] = useState(null);
  // const [roomSearch, setRoomSearch] = useState("");

  var loading = rooms === null;

  var getChats = (id) => {
    axios
      .get(url + `rooms/user/${id}`, { withCredentials: true })
      .then((result) => {
        // console.log(result.data);
        var userRooms = result.data.rooms;
        //setRooms(userRooms.map((r) => ({ id: r.id, name: r.name }) ))
        // console.log(userRooms);
        setRooms(userRooms);
        // console.log(userRooms);
        setRoom(userRooms[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // var filteredRooms = rooms?.filter((r) =>
  //   r.chat_name.toLowerCase().includes(roomSearch.toLowerCase())
  // );
  // var handleSearchChange = (e) => {
  //   setRoomSearch(e.target.value);
  // };

  useEffect(() => {
    getChats(id);
  }, [id]);

  useEffect(() => {
    // console.log(search);
    if (search.length > 0) {
      setRooms(
        rooms.filter((room) =>
          room.chat_name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      getChats(id);
    }
  }, [search]);

  return (
    <div className="flex flex-col p-2">
      {loading ? (
        <>Loading Chats...</>
      ) : (
        <>
          {rooms.map((room, i) =>
            testGroup(room, i, () => {
              setRoom(room);
            })
          )}
        </>
      )}
    </div>
  );
};

export default ChatGroups;
