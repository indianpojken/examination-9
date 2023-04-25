import joi from 'joi';

const noteSchema = joi.object({
  title: joi.string().max(75).required(),
  text: joi.string().required()
});

export { noteSchema };
