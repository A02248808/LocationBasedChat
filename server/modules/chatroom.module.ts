import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from 'server/entities/chatroom.entity';
import { ChatRoomService } from 'server/providers/services/chatroom.service';
import { JwtService } from 'server/providers/services/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [],
  providers: [ChatRoomService, JwtService],
  exports: [TypeOrmModule],
})
export class ChatRoomModule {}
