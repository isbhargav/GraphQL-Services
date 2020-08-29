import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Note } from "./Note";

@Entity()
export class SharedNote extends BaseEntity {
  @PrimaryColumn()
  targerId: number;
  @ManyToOne(() => User, (user) => user.notesSharedWithYou)
  @JoinColumn({ name: "targetId" })
  target: User;

  @PrimaryColumn()
  senderId: number;
  @ManyToOne(() => User, (user) => user.notesYouShared)
  @JoinColumn({ name: "senderId" })
  sender: User;

  @PrimaryColumn()
  noteId: number;
  @ManyToOne(() => Note, (note) => note.shares)
  @JoinColumn({ name: "noteId" })
  note: Note;
}
