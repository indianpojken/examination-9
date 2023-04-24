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

async function getUserById(id) {
  const user = await database.users.findOne({ id });

  if (user) {
    return user;
  } else {
    throw new Error(`no user with the id '${id}' exists`);
  }
}

async function getUserByUsername(username) {
  const user = await database.users.findOne({ username });

  if (user) {
    return user;
  } else {
    throw new Error(`no user with the username '${username}' exists`);
  }
}

export {
  createUser,
  getUserById,
  getUserByUsername
};
