import React, { useState } from "react";

function EditNote({
  alterNote,
  setOpen,
  status,
  body,
  title,
  noteid,
  username
}) {
  let [newUser, setUser] = useState(username);
  let [newTitle, setTitle] = useState(title);
  let [newBody, setBody] = useState(body);

  return (
    <>
      <div className="modal">
        <form
          className="card wi-resp pos-rel pd-16"
          onSubmit={event => {
            event.preventDefault();
            console.log(noteid);
            alterNote({
              title: newTitle || title,
              username: newUser || username,
              body: newBody || body,
              noteid,
              status
            });
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
              value={newTitle}
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
              value={newUser}
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
              value={newBody}
              onChange={event => setBody(event.target.value)}
              rows={5}
              type="text"
              name="body"
              id="note-body"
              required={true}
            />
          </div>

          <button type="submit"> Update note</button>
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

export default EditNote;
