import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { SharedNote } from "./SharedNote";
import { ObjectType, Field } from "type-graphql";
@ObjectType()
@Entity()
export class Note extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Column()
  ownerId: number;
  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: "ownerId" })
  owner: User;

  @OneToMany(() => SharedNote, (sharedNote) => sharedNote.note)
  shares: SharedNote[];
}
