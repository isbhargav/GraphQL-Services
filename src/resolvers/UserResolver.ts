import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import { User } from "../entities/User";
import { Note } from "../entities/Note";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find({ where: {} });
  }
  @Mutation(() => User)
  async createUser(@Arg("username") username: string) {
    return User.create({ username }).save();
  }

  @Mutation(() => Int, { nullable: true })
  async updateUser(
    @Arg("id") id: number,
    @Arg("newUsername") newusername: string
  ): Promise<number | undefined> {
    const op = await User.update({ id }, { username: newusername });
    return op.affected;
  }

  @Mutation(() => Int, { nullable: true })
  async deleteUser(@Arg("id") id: number) {
    const op = await User.delete({ id });
    return op.affected;
  }
  @Mutation(() => Boolean)
  async addNote(@Arg("userId") id: number, @Arg("text") txt: string) {
    const user = await User.findOne({ where: { id } });
    if (!user) return false;
    const note = await Note.create({ text: txt, owner: user }).save();
    return !!note;
  }
  @Mutation(() => [Note], { nullable: true })
  async myNotes(@Arg("userId") id: number) {
    // Note.find({where:{ownerId:id},relations:[]})
    const user_with_notes = await User.findOne({
      where: { id },
      relations: ["notes"],
    });
    console.log({ user_with_notes });
    return user_with_notes?.notes;
  }
}
