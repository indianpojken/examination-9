import * as notesModel from '../models/notes.model.js';
import * as userModel from '../models/user.model.js';

async function getNotes(request, response) {
  const userId = request.user.id;

  try {
    const user = await userModel.findUserById(userId);
    const notes = await notesModel.findAllNotesByUser(user);

    response.status(200).json({
      success: true,
      notes: notes.map((note) => {
        return {
          id: note.id,
          title: note.title,
          text: note.text,
          createdAt: note.createdAt,
          ...(note.modifiedAt && { modifiedAt: note.modifiedAt })
        }
      })
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: `failed to fetch notes from user '${user.id}'`,
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

    await userModel.addNoteToUser(note, user);

    response.status(201).json({
      success: true,
      note: { id: note.id, createdAt: note.createdAt },
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: 'failed to add note',
      cause: error.message
    });
  }
}


export { getNotes, addNote };
