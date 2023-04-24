import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  createUser,
  findUserByUsername,
  findUserById,
  pushNote
} from '../models/user.model.js';

function generateToken(userId) {
  return jwt.sign(
    { id: userId }, process.env.JWT_SECRET, { expiresIn: '30m' }
  );
}

async function getUserById(id) {
  const user = await findUserById(id);

  if (user) {
    return user;
  } else {
    throw new Error(`no user with the id '${id}' exists`);
  }
}

async function getUserByUsername(username) {
  const user = await findUserByUsername(username);

  if (user) {
    return user;
  } else {
    throw new Error(`no user with the username '${username}' exists`);
  }
}

async function loginUser(username, password) {
  try {
    const user = await getUserByUsername(username);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      return {
        id: user.id,
        username: user.username,
        token: generateToken(user.id)
      };
    } else {
      throw new Error('incorrect password');
    }
  } catch (error) {
    throw new Error('failed to login', { cause: error });
  }
}

async function registerUser(username, password) {
  try {
    const usernameExist = await findUserByUsername(username);

    if (!usernameExist) {
      const newUser = await createUser(username, password);

      return { id: newUser.id, username: newUser.username };
    } else {
      throw new Error('username already exists');
    }
  } catch (error) {
    throw new Error('failed to register user', { cause: error });
  }
}

async function addNoteToUser(userId, noteId) {
  try {
    const user = getUserById(userId);
    return await pushNote(user.id, noteId);
  } catch (error) {
    throw new Error('failed to add note to user', { cause: error });
  }
}

export {
  getUserById,
  getUserByUsername,
  loginUser,
  registerUser,
  addNoteToUser
};
