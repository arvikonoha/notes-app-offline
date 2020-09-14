import React from "react";
import NoteBody from "./NoteBody/NoteBody";

function NoteList({ notes, alterNote, removeNote }) {
  return (
    <ul className="mr-32 mr-16y disp-flex">
      {notes.map(({ body, title, username, noteid, status }) => (
        <NoteBody
          body={body}
          title={title}
          username={username}
          alterNote={alterNote}
          removeNote={removeNote}
          noteid={noteid}
          status={status}
        />
      ))}
      {!notes.length && <li className="ls-none card pd-16">No notes</li>}
    </ul>
  );
}

export default NoteList;
