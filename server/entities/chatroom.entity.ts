import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  roomkey: string;
}
