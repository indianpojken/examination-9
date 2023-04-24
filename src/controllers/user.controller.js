import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userModel from '../models/user.model.js';

async function login(request, response) {
  const { username, password } = request.body;

  try {
    const user = await userModel.getUserByUsername(username);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = jwt.sign(
        { id: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' }
      );

      response
        .status(200)
        .cookie('token', token, { httpOnly: true })
        .json({
          success: true,
          user: { id: user.id, username: user.username }
        });
    } else {
      throw new Error('incorrect password');
    }
  } catch (error) {
    response.status(400).json({
      success: false,
      message: 'failed to login',
      cause: error.message,
    });
  }
}

async function signup(request, response) {
  const { username, password } = request.body;

  try {
    const usernameExist = await userModel.findUserByUsername(username);

    if (!usernameExist) {
      const newUser = await userModel.createUser(username, password);

      response.status(201).json({
        success: true,
        user: { id: newUser.id, username: newUser.username }
      });
    } else {
      throw new Error('username already exists');
    }
  } catch (error) {
    response.status(400).json({
      success: false,
      message: 'failed to register user',
      cause: error.message,
    });
  }
}

export { login, signup };
