import axios from 'axios';
import { useEffect, useState } from 'react';

const testGroup = (room, key, changeRoom) => {
  return (
    <div key={key}>
      <div className="divider m-3"></div>
      <div className="w-full text-white flex p-5 items-start justify-center flex-col bg-[black] color-[white] cursor-pointer h-[113px] rounded-[3px]"
        onClick={changeRoom}
       >
        <p className="font-bold">{room.chat_name}</p>
        {room.chat_members.map((m, i) => (
          <p key={i} className="text-xs">{m.users.username}{i + 1 !== room.chat_members.length ? <>,</> : <></>}</p>
        ))}
      </div>
    </div>
  )
}
const url = 'http://localhost:5000/messenger/'

var ChatGroups = ({ id, setRoom }) => {
  const [rooms, setRooms] = useState(null);
  const [roomSearch, setRoomSearch] = useState('');

  var loading = rooms === null;

  var getChats = (id) => axios.get(url + `rooms/user/${id}`);

  var filteredRooms = rooms?.filter(r => r.chat_name.toLowerCase().includes(roomSearch.toLowerCase()))
  var handleSearchChange = (e) => {
    setRoomSearch(e.target.value);
  }

  useEffect(() => {
    getChats(id).then(result => {
      console.log(result.data);
      var userRooms = result.data.rooms;
      //setRooms(userRooms.map((r) => ({ id: r.id, name: r.name }) ))
      setRooms(userRooms);
      setRoom(userRooms[0])
    }).catch(err => {
      console.log(err);
    })
  }, [id])

  return (
    <>
      <div className ="flex justify-center flex-col bg-[black] color-[white] rounded-[3px]">
        <input type="text" placeholder="Search Chats" onChange={handleSearchChange}></input>
      </div>
      {loading ? (<>Loading Chats...</>
      ) : (
        <>
          {filteredRooms.map((room, i) => (
            testGroup(room, i, () => {setRoom(room)})
          ))}
        </>
      )}
    </>
  )
}

export default ChatGroups;