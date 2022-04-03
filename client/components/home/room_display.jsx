import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react/cjs/react.production.min';
import { ApiContext } from '../../utils/api_context';

export const RoomDisplay = () => {
  const [room, setRoom] = useState(null);
  const [contents, setContents] = useState('');
  const api = useContext(ApiContext);
  const { id } = useParams();

  useEffect(async () => {
    const { room } = api.get(`/chat_rooms/${id}`);
    setRoom(room);
  }, [id]);

  return (
    <div className="chat-container">
      <div className="messages"></div>
      <div className="chat-input">
        <input type="text" value={contents} onChange={(message) => setContents(message.target.value)} />
        <Button>Send</Button>
      </div>
    </div>
  );
};
