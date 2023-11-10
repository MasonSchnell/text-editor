import { openDB } from "idb";

const initdb = async () =>
  openDB("jateDb", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("text", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Put to the database");

  // Create a connection to the database database and version we want to use.
  const textDb = await openDB("jateDb", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction("text", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("text");

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log("Data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  try {
    // Create a connection to the database database and version we want to use.
    const textDb = await openDB("jateDb", 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = textDb.transaction("text", "readonly");

    // Open up the desired object store.
    const store = tx.objectStore("text");

    // Use the .getAll() method to get all data in the database.
    const request = store.get(1);

    // Get confirmation of the request.
    const result = await request;
    console.log("result.value", result);
    return result?.value;
  } catch (error) {
    console.log("get Error", error);
  }
};

initdb();
