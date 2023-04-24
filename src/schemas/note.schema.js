import joi from 'joi';

const schema = joi.object({
  title: joi.string().max(75).required(),
  text: joi.string().required()
})

export { schema as noteSchema };
