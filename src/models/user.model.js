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

async function findUserByUsername(username) {
  return await database.users.findOne({ username });
}

async function pushNote(userId, noteId) {
  return await database.users.updateOne(
    { id: userId },
    { $push: { notes: noteId } },
  );
}

export {
  createUser,
  findUserByUsername,
  findUserById,
  pushNote,
};
