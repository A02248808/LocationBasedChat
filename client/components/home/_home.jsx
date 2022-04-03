import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { ChatRooms } from './chat_rooms';
import { Link, Route, Routes } from 'react-router-dom';
import { RoomDisplay } from './room_display';
import { ChatRoom } from './chat_room';

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
    const { chatRoom } = await api.post('chat_rooms', { name, userLatitude, userLongitude });
    setChatRooms([...chatRooms], chatRoom);
  };

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function isWithin20(room) {
    if (getDistanceFromLatLonInKm(userLatitude, userLongitude, room.latitude, room.longitude) <= 20) {
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
    </div>
  );
};
