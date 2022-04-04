import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomController } from 'server/controllers/chatroom.controller';
import { ChatRoom } from 'server/entities/chatroom.entity';
import { Message } from 'server/entities/message.entity';
import { MessagesGateway } from 'server/providers/gateways/messages.gateway';
import { ChatRoomService } from 'server/providers/services/chatroom.service';
import { JwtService } from 'server/providers/services/jwt.service';
import { MessagesService } from 'server/providers/services/messages.service';
import { GuardUtil } from 'server/providers/util/guard.util';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, Message])],
  controllers: [ChatRoomController],
  providers: [ChatRoomService, MessagesGateway, MessagesService, JwtService, GuardUtil],
  exports: [TypeOrmModule],
})
export class ChatRoomModule {}
