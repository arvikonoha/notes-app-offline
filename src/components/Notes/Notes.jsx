import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import AddNote from "../AddNote/AddNote";
import NoteList from "../NoteList/NoteList";

function Notes({ db, notesDB }) {
  let [notes, setNotes] = useState([...notesDB]);

  useEffect(() => {
    setNotes([...notesDB]);
  }, [notesDB]);

  let [isOpen, setOpen] = useState(false);
  function addNote({ title, body, username }) {
    let newNote = {
      noteid: v4(),
      username,
      title,
      body,
      status: "incomplete",
    };
    setNotes([...notes, newNote]);

    let transaction = db.transaction(["notes"], "readwrite");

    // Do something when all the data is added to the database.
    transaction.oncomplete = function (event) {};

    transaction.onerror = function (event) {};

    let objectStore = transaction.objectStore("notes");
    let request = objectStore.add(newNote);
    request.onsuccess = function (event) {};
  }

  function removeNote(noteid) {
    setNotes([...notes.filter((note) => note.noteid !== noteid)]);

    let transaction = db.transaction(["notes"], "readwrite");

    // Do something when all the data is added to the database.
    transaction.oncomplete = function (event) {};

    transaction.onerror = function (event) {};

    let objectStore = transaction.objectStore("notes");
    let request = objectStore.delete(noteid);
    request.onsuccess = function (event) {};
  }

  function alterNote(updNote) {
    setNotes([
      ...notes.map((note) => {
        if (note.noteid === updNote.noteid) return updNote;
        else return note;
      }),
    ]);

    let transaction = db.transaction(["notes"], "readwrite");

    // Do something when all the data is added to the database.
    transaction.oncomplete = function (event) {};

    transaction.onerror = function (event) {};

    let objectStore = transaction.objectStore("notes");
    let request = objectStore.get(updNote.noteid);
    request.onsuccess = function (event) {
      var data = event.target.result;
      // update the value(s) in the object that you want to change
      for (let i in updNote) data[i] = updNote[i];

      let requestUpdate = objectStore.put(data);
      requestUpdate.onerror = function (event) {};
      requestUpdate.onsuccess = function (event) {};
    };
  }

  return (
    <>
      {/* <NotesHeader addCriterian={} />
      <CriteriaList criterien={criterien} /> */}
      {isOpen && <AddNote setOpen={setOpen} addNote={addNote.bind(this)} />}
      <button
        onClick={(event) => setOpen(true)}
        className="primary-btn card mr-32 mr-16y fl-btn-tr"
      >
        Make a new note
      </button>
      <br />
      <h2 className="mr-32 mr-16y">
        Hello Aravind, you have{" "}
        <span className="prim-clr">
          {notes.length ? notes.length : "no"} task{notes.length > 1 ? "s" : ""}{" "}
        </span>{" "}
        left
      </h2>
      <NoteList
        notes={notes}
        removeNote={removeNote.bind(this)}
        alterNote={alterNote.bind(this)}
      />
    </>
  );
}

export default Notes;
