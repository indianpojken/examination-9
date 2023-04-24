import joi from 'joi';

const schema = joi.object({
  username: joi.string().alphanum().required(),
  password: joi.string().alphanum().required()
})

export { schema as userSchema };
