import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { ChatRooms } from './chat_rooms';
import { Route, Routes } from 'react-router-dom';
import { RoomDisplay } from './room_display';
import { ChatRoom } from './chat_room';
import { CreateRoomModal } from './CreateRoomModal';

export const Home = () => {
  const api = useContext(ApiContext);
  const [isOpen, setIsOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [userLatitude, setUserLatitude] = useState(-1);
  const [userLongitude, setUserLongitude] = useState(-1);

  useEffect(async () => {
    const { chatRooms } = await api.get('/chat_rooms');
    if (chatRooms != null) {
      setChatRooms(chatRooms);
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
    });
  }, []);

  const createChatRoom = async (name) => {
    setIsOpen(false);
    const { chatRoom } = await api.post('chat_rooms', { name: name, latitude: userLatitude, longitude: userLongitude });
    setChatRooms([...chatRooms], chatRoom);
  };

  // Convert Degress to Radians
  function Deg2Rad(deg) {
    return (deg * Math.PI) / 180;
  }

  function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = lat2 - lat1;
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  function isWithin20(room) {
    if (PythagorasEquirectangular(userLatitude, userLongitude, room.latitude, room.longitude) <= 20) {
      return true;
    }
    return false;
  }

  return (
    <div className="app-container">
      <ChatRooms>
        {chatRooms
          .filter((item) => isWithin20(item))
          .map((room) => {
            return (
              <ChatRoom key={room.id} to={`chat_rooms/${room.id}`}>
                {room.name}
              </ChatRoom>
            );
          })}
        <ChatRoom action={() => setIsOpen(true)}>+</ChatRoom>
      </ChatRooms>
      <div className="chat-window">
        <Routes>
          <Route path="chat_rooms/:id" element={<RoomDisplay />} />
          <Route path="/*" element={<div>Add or Select a Room to Chat</div>} />
        </Routes>
      </div>
      {isOpen ? <CreateRoomModal createRoom={createChatRoom} closeModal={() => setIsOpen(false)} /> : null}
    </div>
  );
};
