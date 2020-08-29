import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Note } from "./Note";
import { SharedNote } from "./SharedNote";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @OneToMany(() => Note, (note) => note.owner)
  notes: Note[];

  @OneToMany(() => SharedNote, (sharedNote) => sharedNote.target)
  notesSharedWithYou: Note[];

  @OneToMany(() => SharedNote, (sharedNote) => sharedNote.sender)
  notesYouShared: Note[];
}
