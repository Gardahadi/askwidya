import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timeStamp: Date;

  @Column('text')
  text: string;
}
