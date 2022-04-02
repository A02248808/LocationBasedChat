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

  findOne(id: number): Promise<ChatRoom> {
    return this.chatroomRepository.findOne(id);
  }

  findAll(): Promise<ChatRoom[]> {
    return this.chatroomRepository.find();
  }

  async create(chatRoom: ChatRoom): Promise<ChatRoom> {
    return this.chatroomRepository.save(chatRoom);
  }
}
