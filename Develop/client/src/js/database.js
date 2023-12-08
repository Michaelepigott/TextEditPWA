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
export const putDb = async (content) =>{ 
  console.error('Putting content into Database');
  //connect to db
  const jateDB = await openDB('jate', 1);
  //define how function interacts with db
  const tx = jateDB.transaction('jate', 'readwrite');
  //opens db
  const saved = tx.opjectStore('jate');
  //save item to db
  const req = saved.put({id: id, jate: content});
  //confirm completion
  const res = await req;
  console.log('Data saved: ', res);
  };
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  console.log('Getting everything from DB');
  //connect to db
  const jateDB = await openDB('jate', 1);
  //define how function interacts with db
  const tx = jateDB.transaction('jate', 'readonly');
  //open db
  const saved = tx.opjectStore('jate');
  //get data from function
  const req = saved.get(1);
  //get result
  const res = await req;
  //confirm and display if it worked
  res
  ? console.log("Data Retreived:", res.value)
  : console.log("Data not found");
  return res;
  };
initdb();
