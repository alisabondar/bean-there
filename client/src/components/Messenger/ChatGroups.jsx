import axios from 'axios';
import { useEffect, useState } from 'react';

const testGroup = (room, key, changeRoom) => {
  return (
    <div key={key}>
      {key !== 0 ? (
        <div className="divider m-3"></div>
      ) : (<div></div>)}
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
  var loading = rooms === null;

  var getChats = (id) => axios.get(url + `rooms/user/${id}`);

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
    <div className="grid pt-5 grid-cols-1 justify-items-center">
      {loading ? (<>Loading Chats...</>
      ) : (
        <>
          {rooms.map((room, i) => (
            testGroup(room, i, () => {setRoom(room)})
          ))}
        </>
      )}
    </div>
  )
}

export default ChatGroups;