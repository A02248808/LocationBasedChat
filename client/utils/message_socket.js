import { useState, useRef, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './auth_context';

export const messageSocket = (room) => {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef([]);
  const [socket, setSocket] = useState(null);
  const [authToken] = useContext(AuthContext);

  useEffect(() => {
    if (room) {
      const socket = io({
        auth: {
          token: authToken,
        },
        query: {
          roomId: room.id,
        },
      });
      setSocket(socket);
      socket.on('message', (message) => {
        messageRef.current.push(message);
        setMessages([...messageRef.current]);
      });
      socket.on('beginning-messages', (messages) => {
        messageRef.current = messages;
        setMessages(messages);
      });
      return () => {
        socket.off('message');
        socket.off('beginning-messages');
        socket.disconnect();
      };
    }
    return () => {};
  }, [room]);

  const sendMsg = (contents, user) => {
    socket.emit('message', {
      contents,
      userName: `${user.firstName} ${user.lastName}`,
    });
  };
  return [messages, sendMsg];
};
