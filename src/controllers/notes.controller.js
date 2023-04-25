import * as notesModel from '../models/notes.model.js';
import * as userModel from '../models/user.model.js';

import { createNoteResponse } from '../helpers.js';

async function getNotes(request, response) {
  /*
  I denna controller och searchNotes har jag varit kluven
  ifall jag bör kast en error om inga anteckningar finns.
  Men jag tänker samtidigt att det fortfarande är ett lyckat
  call och att du får till baka notes och den är tom - för att.
  sedan hantera detta på frontend.
  */
  const userId = request.user.id;

  try {
    const user = await userModel.findUserById(userId);
    const notes = await notesModel.findAllNotesByUser(user);

    response.status(200).json({
      success: true,
      notes: notes.map((note) => createNoteResponse(note))
    });
  } catch (error) {
    response.status(404).json({
      success: false,
      message: `failed to fetch notes from user id '${userId}'`,
      cause: error.message
    });
  }
}

async function addNote(request, response) {
  const userId = request.user.id;
  const { title, text } = request.body;

  try {
    const user = await userModel.getUserById(userId);
    const note = await notesModel.createNote(user.id, title, text);

    response.status(201).json({
      success: true,
      note: createNoteResponse(note)
    });
  } catch (error) {
    response.status(404).json({
      success: false,
      message: 'failed to add note',
      cause: error.message
    });
  }
}

async function modifyNote(request, response) {
  const userId = request.user.id;
  const { noteId } = request.params;
  const { title, text } = request.body;

  try {
    const note = await notesModel.getNoteById(noteId);

    if (note.userId === userId) {
      await notesModel.updateNote(note, title, text);
      const updatedNote = await notesModel.getNoteById(noteId);

      response.status(200).json({
        success: true,
        note: createNoteResponse(updatedNote)
      });
    } else {
      throw new Error(`note does not belong to user id '${userId}'`);
    }
  } catch (error) {
    response.status(404).json({
      success: false,
      message: 'failed to add note',
      cause: error.message
    });
  }
}

async function deleteNote(request, response) {
  const userId = request.user.id;
  const { noteId } = request.params;

  try {
    const note = await notesModel.getNoteById(noteId);

    if (note.userId === userId) {
      await notesModel.removeNote(note);

      response.status(200).json({
        success: true,
        note: createNoteResponse(note),
      });
    } else {
      throw new Error(`note does not belong to user id '${userId}'`);
    }
  } catch (error) {
    response.status(404).json({
      success: false,
      message: 'failed to delete note',
      cause: error.message
    });
  }
}

async function searchNotes(request, response) {
  const userId = request.user.id;
  const { query } = request.query;

  try {
    if (!query) {
      throw Error('missing serach query')
    }

    const user = await userModel.getUserById(userId);
    const notes = await notesModel.findAllNotesByUser(user);
    const foundNotes = notesModel.searchNotesByTitle(notes, query);

    response.status(200).json({
      success: true,
      notes: foundNotes.map((note) => createNoteResponse(note))
    });
  } catch (error) {
    response.status(404).json({
      success: false,
      message: 'failed to search for notes',
      cause: error.message
    });
  }
}

export {
  getNotes,
  addNote,
  modifyNote,
  deleteNote,
  searchNotes
};
