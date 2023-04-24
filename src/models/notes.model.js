import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

import { database } from '../database.js';

async function createNote(userId, title, text) {
  return await database.notes.insert({
    id: nanoid(),
    userId,
    title,
    text,
    createdAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
    modifiedAt: ''
  });
}

async function findNoteById(id) {
  return await database.notes.findOne({ id });
}

async function getNoteById(id) {
  const note = await findNoteById(id);

  if (note) {
    return note;
  } else {
    throw new Error(`no note with the id '${id}' exists`);
  }
}

async function findAllNotesByUser(user) {
  return await database.notes.find({ userId: user.id })
}

async function updateNote(note, data = { title, text }) {
  return await database.notes.updateOne(
    { id: note.id },
    {
      $set: {
        ...(data.title && { title: data.title }),
        ...(data.text && { text: data.text }),
        modifiedAt: dayjs().format('DD/MM/YYYY HH:mm:ss'),
      }
    }
  );
}

async function removeNote(note) {
  return await database.notes.removeOne({ id: note.id });
}

export {
  createNote,
  getNoteById,
  findNoteById,
  findAllNotesByUser,
  updateNote,
  removeNote,
};
