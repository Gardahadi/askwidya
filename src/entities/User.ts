import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  psid: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  birthDate: Date;
}
