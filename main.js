import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import { userRouter } from './src/routers/user.router.js';
import { notesRouter } from './src/routers/notes.router.js';

import apiDocs from './docs/api.json' assert {type: 'json'};

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/docs', swaggerUI.serve);
app.use('/api/docs', swaggerUI.setup(apiDocs));

app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: 'no such endpoint',
    endpoint: request.url,
  });
})

app.use((error, request, response, next) => {
  console.log(error.stack);

  response.status(500).json({
    success: false,
    message: 'abandon ship! - something went horribly wrong'
  });
})

app.listen(port);
