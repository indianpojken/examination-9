import jwt from 'jsonwebtoken';

function authorize(request, response, next) {
  const { token } = request.cookies;

  try {
    if (!token) {
      throw new Error('no token provided');
    }

    request.user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    response.status(401).clearCookie('token').json({
      success: false,
      message: error.message,
    });
  }
}

export { authorize };
