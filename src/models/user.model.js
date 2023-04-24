import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

import { database } from '../database.js';

async function createUser(username, password) {
  return await database.users.insert({
    id: nanoid(),
    username,
    password: await bcrypt.hash(password, 10),
    notes: [],
  });
}

async function findUserById(id) {
  return await database.users.findOne({ id });
}

async function getUserById(id) {
  const user = await findUserById(id);

  if (user) {
    return user;
  } else {
    throw new Error(`no user with the id '${id}' exists`);
  }
}

async function findUserByUsername(username) {
  return await database.users.findOne({ username });
}

async function getUserByUsername(username) {
  const user = await findUserByUsername(username);

  if (user) {
    return user;
  } else {
    throw new Error(`no user with the username '${username}' exists`);
  }
}

async function addNoteToUser(note, user) {
  return await database.users.updateOne(
    { id: user.id },
    { $push: { notes: note.id } },
  );
}

export {
  createUser,
  findUserById,
  getUserById,
  findUserByUsername,
  getUserByUsername,
  addNoteToUser,
};
