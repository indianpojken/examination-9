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

async function findAllNotesByUserId(userId) {
  return await database.notes.find({ userId })
}

export {
  createNote,
  findAllNotesByUserId,
  findNoteById
};
