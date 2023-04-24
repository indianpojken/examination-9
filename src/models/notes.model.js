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

export {
  createNote,
  getNoteById,
  findNoteById,
  findAllNotesByUser
};
