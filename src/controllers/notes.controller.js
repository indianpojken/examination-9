import {
  getNotesFromUser,
  addNote
} from '../services/notes.service.js';

import { addNoteToUser } from '../services/user.service.js';

async function get(request, response) {
  const userId = request.user.id;

  try {
    const notes = await getNotesFromUser(userId);

    response.status(200).json({ success: true, notes });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
      cause: error?.cause?.message,
    });
  }
}

async function post(request, response) {
  const userId = request.user.id;
  const { title, text } = request.body;

  try {
    const note = await addNote(userId, title, text);
    await addNoteToUser(userId, note.id);

    response.status(200).json({ success: true, note });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: error.message,
      cause: error?.cause?.message,
    });
  }
}


export { get, post };
