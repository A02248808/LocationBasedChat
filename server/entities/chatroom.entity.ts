import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  latitude: number;

  @Column({ nullable: false })
  longitude: number;

  @Column({ nullable: false })
  roomKey: string;

  @OneToMany(() => Message, (message) => message.chatRoom)
  messages: Message[];
}
