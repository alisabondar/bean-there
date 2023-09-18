import axios from 'axios';
import { useEffect, useState } from 'react';

const testGroup = (room, key, changeRoom) => {
  return (
    <div key={key}>
      {key !== 0 ? (
        <div className="divider m-3"></div>
      ) : (<div></div>)}
      <div className="w-full flex p-5 items-start justify-center flex-col bg-[#212121] cursor-pointer h-[113px] rounded-[11px] border-[1.5px] border-grey-500"
        onClick={changeRoom}
       >
        <p className="font-bold">{room.name}</p>
        <p>
          Member1, Member2, Member3
        </p>
        <p>
          Member2: Last Message
        </p>
      </div>
    </div>
  )
}
const url = 'http://localhost:5000/messenger/'

var ChatGroups = ({ id, setRoom }) => {
  const [rooms, setRooms] = useState([]);

  var getChats = (id) => axios.get(url + `rooms/user/${id}`);

  useEffect(() => {
    getChats(id).then(result => {
      console.log(result.data);
      var userRooms = result.data.rooms;
      setRooms(userRooms.map((r) => ({ id: r.id, name: r.name }) ))
    }).catch(err => {
      console.log(err);
    })
  }, [id])

  return (
    <div className="grid pt-5 grid-cols-1 justify-items-center">
      {rooms.map((room, i) => (
        testGroup(room, i, () => setRoom(room.id))
      ))}
    </div>
  )
}

export default ChatGroups;