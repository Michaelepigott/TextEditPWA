import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, jate: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

//create method to get database content
export const getAllDb = async () => {
  console.log('GET all from the database');
  // connect to database and set version
  const jateDb = await openDB('jate', 1);
  // set permissions for transactions
  const tx = jateDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // make route get all data from database
  const request = store.get(1);
   // Get confirmation of the request.
  const result = await request;
  console.log('result:', result);
  result
  ? console.log('Error: Data not Retreived,', result.value)
  : console.log('Error: Data not Found');
  return result;
};

initdb();