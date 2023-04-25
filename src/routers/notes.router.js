import { Router } from 'express';

import { authorize } from '../middlewares/authorize.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

import { noteSchema } from '../schemas/note.schema.js';

import * as notesController from '../controllers/notes.controller.js';

const router = Router();

router.get('/', authorize, notesController.getNotes);

router.post('/', authorize, validate(noteSchema), notesController.addNote);

router.put(
  '/:noteId',
  authorize,
  validate(noteSchema),
  notesController.modifyNote
);

router.delete('/:noteId', authorize, notesController.deleteNote);

router.get('/search/', authorize, notesController.searchNotes);

export { router as notesRouter };
