import React from 'react';
import NoteItem from "../note-item/NoteItem";
import s from "./NotesList.module.scss";

const NotesList = ({ notes, removeNote, updateNote, createTag, filter }) => {

   if (!notes.length) {
      if (filter.query) {
         return (
            <h1 className={s.message}>
               Notes not found...
            </h1>
         )
      } else {
         return (
            <h1 className={s.message}>
               Your notes will be here!
            </h1>
         )
      }
   }

   return (
      <div className={s.noteList}>
         <div className={s.noteList__container}>
            {notes.map((note) =>
               <NoteItem key={note.id}
                  id={note.id}
                  removeNote={removeNote}
                  updateNote={updateNote}
                  note={note}
                  createTag={createTag}
               />
            )}
         </div>
      </div>
   );
};

export default NotesList;