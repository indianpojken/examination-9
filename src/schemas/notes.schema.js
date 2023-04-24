import joi from 'joi';

const addNoteSchema = joi.object({
  title: joi.string().max(75).required(),
  text: joi.string().required()
});

const updateNoteSchema = joi.object({
  title: joi.string().max(75).required(),
  text: joi.string().required()
});

export { addNoteSchema, updateNoteSchema };