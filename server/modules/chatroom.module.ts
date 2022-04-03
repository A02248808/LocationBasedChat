import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomController } from 'server/controllers/chatroom.controller';
import { ChatRoom } from 'server/entities/chatroom.entity';
import { ChatRoomService } from 'server/providers/services/chatroom.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomController],
  providers: [ChatRoomService],
  exports: [TypeOrmModule],
})
export class ChatRoomModule {}
