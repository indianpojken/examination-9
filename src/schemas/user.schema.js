import joi from 'joi';

const userSchema = joi.object({
  username: joi.string().alphanum().required(),
  password: joi.string().alphanum().required()
});

export { userSchema };
