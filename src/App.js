import React, { useEffect, useState } from "react";
import Notes from "./components/Notes/Notes";

function App() {
  let [db, setDB] = useState({});
  let [notes, setNotes] = useState([]);
  useEffect(() => {
    if (!("indexedDB" in window)) {
      window.indexedDB =
        window.indexedDB ||
        window.webkitIndexedDB ||
        window.mozIndexedDB ||
        window.oIndexedDB ||
        window.msIndexedDB;
    }
    window.IDBTransaction = window.IDBTransaction ||
      window.webkitIDBTransaction ||
      window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
    window.IDBKeyRange =
      window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    if (!window.indexedDB) {
      console.log(
        "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
      );
    }
    var request = window.indexedDB.open("NoteApp", 4);
    request.onerror = function(event) {};
    request.onsuccess = function(event) {
      let dbLocal = event.target.result;
      setDB(dbLocal);

      let objectStore = dbLocal.transaction("notes").objectStore("notes");
      let notesLocal = [];
      objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
          notesLocal.push(cursor.value);
          cursor.continue();
        } else {
          setNotes(notesLocal);
        }
      };
    };

    request.onupgradeneeded = function(event) {
      let db = event.target.result;

      let objStore = db.createObjectStore("notes", { keyPath: "noteid" });
      objStore.createIndex("body", "body", { unique: false });
      objStore.createIndex("username", "username", { unique: false });
      objStore.createIndex("title", "title", { unique: false });
      objStore.createIndex("deadline", "deadline", { unique: false });
    };
  }, []);
  return <Notes db={db} notesDB={notes} />;
}

export default App;
