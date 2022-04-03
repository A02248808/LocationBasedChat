import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatRoom } from 'server/entities/chatroom.entity';
import { ChatRoomService } from 'server/providers/services/chatroom.service';
import * as crypto from 'crypto';

class ChatRoomBody {
  name: string;
  latitude: number;
  longitude: number;
}

@Controller()
export class ChatRoomController {
  constructor(private chatroomService: ChatRoomService) {}

  @Get('/chat_rooms')
  async index() {
    const chatRooms = await this.chatroomService.findAll();
    return { chatRooms };
  }

  @Get('/chat_rooms/:id')
  async show(@Param('id') id: string) {
    const chatRoom = await this.chatroomService.findOne(parseInt(id));
    return { chatRoom };
  }

  @Post('/chat_rooms')
  async create(@Body() body: ChatRoomBody) {
    let chatRoom = new ChatRoom();
    chatRoom.name = body.name;
    chatRoom.longitude = body.longitude;
    chatRoom.latitude = body.latitude;
    chatRoom.roomkey = crypto.randomBytes(8).toString('hex');
    chatRoom = await this.chatroomService.create(chatRoom);
    return { chatRoom };
  }
}
