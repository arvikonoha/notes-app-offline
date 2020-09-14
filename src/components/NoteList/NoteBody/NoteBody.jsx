import React, { useState } from "react";
import EditNote from "../../EditNote/EditNote";

function formatList(listItems) {
  let listJSX = [];
  let i;
  for (i = 0; i < listItems.length; ++i)
    if (listItems[i].startsWith("*"))
      listJSX.push(
        <>
          <li>{listItems[i].slice(1)}</li>
          <br />
        </>
      );
    else break;
  return [<ul className="pd-16">{listJSX}</ul>, i];
}

function formatText(text) {
  let lines = text.split("\n");
  let fmtJSX = [];
  let fmtList, nxtIndex;
  for (let i = 0; i < lines.length; ++i)
    // If the line is a secondary heading
    if (lines[i].startsWith("##"))
      fmtJSX.push(
        <>
          <h3>{lines[i].slice(2)}</h3>
          <br />
        </>
      );
    // If the line is a primary heading
    else if (lines[i].startsWith("#"))
      fmtJSX.push(
        <>
          <h2>{lines[i].slice(1)}</h2>
          <br />
        </>
      );
    // If the upcoming lines are list items
    else if (lines[i].startsWith("*")) {
      [fmtList, nxtIndex] = formatList(lines.slice(i));
      i += nxtIndex - 1;
      fmtJSX.push(fmtList);
      // If it's a regular text
    } else
      fmtJSX.push(
        <>
          <p>{lines[i]}</p>
          <br />
        </>
      );

  return fmtJSX;
}

function NoteBody({
  body,
  title,
  status,
  username,
  noteid,
  alterNote,
  removeNote
}) {
  let [isOpen, setOpen] = useState(false);
  function resolveTitleStyle(status) {
    return status === "complete"
      ? "list-header-typo strikeout txt-hier-4"
      : "list-header-typo";
  }

  function resolveTextStyle(status) {
    return status === "complete" ? "pd-16 txt-hier-4" : "pd-16";
  }

  return (
    <li className="ls-none card flex-basis-30 mr-8 pos-rel" key={noteid}>
      {isOpen && (
        <EditNote
          setOpen={setOpen}
          body={body}
          title={title}
          username={username}
          noteid={noteid}
          alterNote={alterNote}
          status={status}
        />
      )}
      <div className="edit-btn">
        <i class="fas fa-edit" onClick={event => setOpen(true)}></i>
        <i class="fas fa-trash" onClick={event => removeNote(noteid)}></i>
      </div>
      <header className="pd-16 list-header">
        {status === "incomplete" ? (
          <i
            class="fas fa-check"
            onClick={event => {
              alterNote({ username, title, body, status: "complete", noteid });
            }}
          ></i>
        ) : (
          <i
            class="fas fa-minus-circle"
            onClick={event => {
              alterNote({
                username,
                title,
                body,
                status: "incomplete",
                noteid
              });
            }}
          ></i>
        )}
        <span className={resolveTitleStyle(status)}> {title}</span>
      </header>
      <section className={resolveTextStyle(status)}>{formatText(body)}</section>
    </li>
  );
}

export default NoteBody;
