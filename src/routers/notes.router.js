import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

import { addNoteSchema, updateNoteSchema } from '../schemas/notes.schema.js';

import * as notesController from '../controllers/notes.controller.js';

const router = Router();

router.get('/', authorize, notesController.getNotes);
router.post('/', authorize, validate(addNoteSchema), notesController.addNote);

export { router as notesRouter };
