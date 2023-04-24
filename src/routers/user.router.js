import { Router } from 'express';

import { validate } from '../middlewares/validate.middleware.js';

import { userSchema } from '../schemas/user.schema.js';

import * as userController from '../controllers/user.controller.js';

const router = Router();

router.post('/login', validate(userSchema), userController.login);
router.post('/signup', validate(userSchema), userController.signup);

export { router as userRouter };
