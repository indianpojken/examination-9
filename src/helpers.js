function createNoteResponse(note) {
  return {
    id: note.id,
    title: note.title,
    text: note.text,
    createdAt: note.createdAt,
    ...(note.modifiedAt && { modifiedAt: note.modifiedAt })
  }
}

export { createNoteResponse };
