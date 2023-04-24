import {
  createNote,
  findAllNotesByUserId
} from '../models/notes.model.js';

import { getUserById } from './user.service.js';

async function getNoteById(id) {
  const note = await findNoteById(id);

  if (note) {
    return note;
  } else {
    throw new Error(`no note with the id '${id}' exists`);
  }
}

async function getNotesFromUser(userId) {
  try {
    const user = await getUserById(userId);
    const notes = await findAllNotesByUserId(user.id);

    return notes.map((note) => {
      return {
        id: note.id,
        title: note.title,
        text: note.text,
        createdAt: note.createdAt,
        ...(note.modifiedAt && { modifiedAt: note.modifiedAt })
      }
    });
  } catch (error) {
    throw new Error(
      `failed to fetch notes from user '${userId}'`,
      { cause: error }
    );
  }
}

async function addNote(userId, title, text) {
  try {
    const user = await getUserById(userId);
    const note = await createNote(user.id, title, text);

    return {
      id: note.id, createdAt: note.createdAt
    }
  } catch (error) {
    throw new Error(`failed to add add note`, { cause: error });
  }
}

export {
  getNoteById,
  getNotesFromUser,
  addNote,
}
