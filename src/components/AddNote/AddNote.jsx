import React, { useState } from "react";

function AddNote({ addNote, setOpen }) {
  let [user, setUser] = useState("");
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");

  return (
    <>
      <div className="modal">
        <form
          className="card wi-resp pos-rel pd-16"
          onSubmit={event => {
            event.preventDefault();
            addNote({ title, username: user, body });
            setOpen(false);
          }}
        >
          <i
            onClick={event => {
              setOpen(false);
            }}
            className="far fa-times-circle close-btn"
          ></i>
          <h2>Make a new note</h2>
          <br />
          <div>
            <label htmlFor="note-title">Title</label>
            <br />
            <input
              value={title}
              placeholder="eg: Wash dishes"
              onChange={event => setTitle(event.target.value)}
              type="text"
              name="title"
              id="note-title"
              required={true}
            />
          </div>
          <div>
            <label htmlFor="note-user">User name</label>
            <br />
            <input
              placeholder="eg: Michiel De Santa"
              value={user}
              onChange={event => setUser(event.target.value)}
              type="text"
              name="user"
              id="note-user"
              required={true}
            />
          </div>
          <div>
            <label htmlFor="note-body">Body</label>
            <br />
            <textarea
              placeholder="eg: I have to take a piss, watch t.v then wash dishes"
              value={body}
              onChange={event => setBody(event.target.value)}
              rows={5}
              type="text"
              name="body"
              id="note-body"
              required={true}
            />
          </div>

          <button type="submit"> Add note</button>
          <button
            type="cancel"
            onClick={event => {
              setOpen(false);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
