import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Note } from "./entities/Note";
import { SharedNote } from "./entities/SharedNote";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/helloworld";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    host: "",
    port: 5432,
    database: "exmapleschema",
    username: "postgres",
    password: "docker",
    entities: [User, Note, SharedNote],
    synchronize: true,
    logging: true,
    logger: "file",
  });

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
    }),
  });

  server.listen().then(({ url }) => {
    console.log("server up on : ", url);
  });

  //   // CRUD On Single Table

  //   const bob = await User.create({ username: "bob" }).save(); // CREATE
  //   const oneUser = await User.findOne({ where: { username: "bob" } }); // READ SINGLE
  //   const allUsers = await User.find({ where: { username: "bob" } }); // READ MULTIPLE
  //   const updatedUser = await User.update({ id: bob.id }, { username: "bob2" }); // UPDATE ALL
  //   const bob3 = await User.create({ username: "bob3" }).save(); // CREATE
  //   const deleteUser = await User.delete({ username: "bob3" }); // DELETE

  //   console.log({ bob, oneUser, allUsers, updatedUser, deleteUser });

  //   // CRUD On Many to One
  //   const joe = await User.create({ username: "joe" }).save(); // CREATE
  //   const joe_note = await Note.create({
  //     text: "eat breakfast",
  //     ownerId: joe.id,
  //   }).save();

  //   const notes = await Note.find({ where: { owner: joe.id } });
  //   console.log({ notes });

  //   // CRUD On Many to Many

  //   const tim = await User.create({ username: "tim" }).save(); // CREATE
  //   await SharedNote.create({
  //     senderId: joe.id,
  //     targerId: bob.id,
  //     noteId: joe_note.id,
  //   }).save();

  //   const notesSharedWithTim = await SharedNote.find({
  //     where: {
  //       targerId: tim.id,
  //     },
  //     relations: ["note"],
  //   });
  //   console.log({ notesSharedWithTim });
};
main().catch((err) => console.error(err));
