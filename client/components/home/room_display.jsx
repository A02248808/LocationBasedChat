import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../../utils/api_context';
import { messageSocket } from '../../utils/message_socket';
import { Message } from './message';
import { Button } from '../common/button';

export const RoomDisplay = () => {
  const [room, setRoom] = useState(null);
  const [contents, setContents] = useState('');
  const [user, setUser] = useState(null);
  const api = useContext(ApiContext);
  const { id } = useParams();
  const [messages, sendMessage] = messageSocket(room);

  useEffect(async () => {
    if (!user) {
      const { user } = await api.get('/users/me');
      setUser(user);
    }
    const { room } = await api.get(`/chat_rooms/${id}`);
    setRoom(room);
  }, [id]);

  return (
    <div className="chat-container">
      <div className="messages">
        {[...messages].reverse().map((message) => {
          <Message key={message.id} message={message} />;
        })}
      </div>
      <div className="chat-input">
        <input type="text" value={contents} onChange={(e) => setContents(e.target.value)} />
        <Button onClick={() => sendMessage(contents, user)}>Send</Button>
      </div>
    </div>
  );
};
