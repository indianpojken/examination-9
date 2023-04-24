import { loginUser, registerUser } from '../services/user.service.js';

async function login(request, response) {
  const { username, password } = request.body;

  try {
    const user = await loginUser(username, password);

    response
      .status(200)
      .cookie('token', user.token, { httpOnly: true })
      .json({
        success: true, user: {
          id: user.id,
          username: user.username
        }
      });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
      cause: error?.cause?.message,
    });
  }
}

async function signup(request, response) {
  const { username, password } = request.body;

  try {
    const newUser = await registerUser(username, password);

    response.status(201).json({ success: true, user: newUser });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
      cause: error?.cause?.message,
    });
  }
}

export { login, signup };
