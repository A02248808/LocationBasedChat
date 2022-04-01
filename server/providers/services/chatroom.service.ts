import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'server/entities/chatroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatroomRepository: Repository<ChatRoom>,
  ) {}

  findOne(id: number) {
    return this.chatroomRepository.findOne(id);
  }
}
