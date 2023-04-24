import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

import { noteSchema } from '../schemas/note.schema.js';

import * as notesController from '../controllers/notes.controller.js';

const router = Router();

router.get('/', authorize, notesController.get);
router.post('/', authorize, validate(noteSchema), notesController.post);

export { router as notesRouter };
