import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  createUser,
  getUserById,
  getUserByUsername
} from '../models/user.model.js';

function generateToken(userId) {
  return jwt.sign(
    { id: userId }, process.env.JWT_SECRET, { expiresIn: '30m' }
  );
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
    const usernameExist =
      !!await getUserByUsername(username).catch(() => false);

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

export { loginUser, registerUser };
