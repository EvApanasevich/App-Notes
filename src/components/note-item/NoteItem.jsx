import React from 'react';
import NoteForm from '../note-form/NoteForm';
import { useState } from 'react';
import s from "./NoteItem.module.scss";
import Tag from '../UI/tag/Tag';

const NoteItem = ({ removeNote, note, updateNote, createTag }) => {

   const [isEdit, setIsEdit] = useState(false)
   const [isFocus, setIsFocus] = useState(false)

   const removeTag = (id) => {
      updateNote({ ...note, tags: [...note.tags.filter(tag => tag.id !== id)] }, note.id)
   }

   return (
      <div className={s.note} onMouseEnter={() => setIsFocus(true)} onMouseLeave={() => setIsFocus(false)}>
         {isEdit ?
            <div>
               <NoteForm isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  updateNote={updateNote}
                  removeNote={removeNote}
                  note={note}
                  createTag={createTag}
               />
               {note.tags.map(item => <Tag key={item.id} tag={item} removeTag={removeTag} />)}
            </div>
            :
            <div className={s.note__container}>
               {isFocus &&
                  <div className={s.delAndEdit}>
                     <div className={s.delAndEdit__edit} onClick={() => setIsEdit(true)}></div>
                     <div className={s.delAndEdit__delete} onClick={() => removeNote(note.id)}></div>
                  </div>
               }
               <div className={s.note__title}>{note.title}</div>
               <div className={s.note__body}>{note.body}</div>
               {isFocus &&
                  <div className={s.tagsList}>
                     {note.tags.map(item => <Tag key={item.id} tag={item} removeTag={removeTag} />)}
                  </div>
               }
            </div>
         }
      </div>
   );
};

export default NoteItem;