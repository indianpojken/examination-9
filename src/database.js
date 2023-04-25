import Datastore from 'nedb-promises';

const database = {
  users: Datastore.create('users.db'),
  notes: Datastore.create('notes.db'),
};

export { database };
