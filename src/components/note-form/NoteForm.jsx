import React, { useState } from 'react';
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import Tag from '../UI/tag/Tag';
import s from "./NoteForm.module.scss";

const NoteForm = ({ isEdit, setIsEdit, note, createNote, updateNote, removeNote, removeTag }) => {

   const [createdNote, setCreatedNote] = useState({ title: isEdit ? note.title : '', body: isEdit ? note.body : '', tags: [] })
   const [tagAddIsVisible, setTagAddIsVisible] = useState(false)
   const [tagExists, setTagExists] = useState(false)
   const [tag, setTag] = useState('')

   const addNewNote = () => {
      if (createdNote.body ||
         createdNote.title) {
         const newNote = {
            ...createdNote,
            id: Date.now(),
         }
         createNote(newNote)
         setCreatedNote({ ...createdNote, title: '', body: '', tags: [] })
      } else return
   }

   const update = () => {
      if (!createdNote.title && !createdNote.body) {
         removeNote(note.id)
      } else {
         updateNote({
            ...note,
            title: createdNote.title,
            body: createdNote.body,
            tags: [...note.tags, ...createdNote.tags]
         }, note.id)
         setIsEdit(false)
      }
   }
   const addNewTag = () => {
      if (createdNote.tags.find(item => item.name === tag)) {
         setTagExists(true)
         return
      } else {
         const newTag = {
            name: tag,
            id: Date.now(),
         }
         setCreatedNote({ ...createdNote, tags: [...createdNote.tags, newTag] })
         setTagAddIsVisible(false)
      }
   }
   const removeTempTag = (tagId) => {
      setCreatedNote({ ...createdNote, tags: createdNote.tags.filter(tag => tag.id !== tagId) })
   }

   const inputProcessing = (e, flag) => {
      const value = e.currentTarget.value
      const text = e.currentTarget.value.split('')

      setTagExists(false)
      if (text.find((s => s === '#'))) {
         if (text[text.length - 1] === '#') {
            setTagAddIsVisible(false)
         } else if (text[text.length - 1] === ' ') {
            setTagAddIsVisible(false)
         } else {
            setTagAddIsVisible(true)
            const arrWords = value.split('#')

            if ((arrWords[arrWords.length - 1].includes(' ') &&
               !arrWords[arrWords.length - 1].includes('#')) ||
               arrWords[arrWords.length - 1].length > 10) {
               setTagAddIsVisible(false)
            }
            let tagName = ''
            for (let i = arrWords.length - 1; i > 0; i--) {
               if (!arrWords[i].includes(' ')) {
                  tagName = '#' + arrWords[i] + tagName
               } else {
                  break
               }
            }
            setTag(tagName)
         }
      } else {
         setTagAddIsVisible(false)
      }
      if (flag === 'title') {
         setCreatedNote({ ...createdNote, title: e.currentTarget.value })
      } else {
         setCreatedNote({ ...createdNote, body: e.currentTarget.value })
      }
   }

   return (
      <div className={s.form}>
         <Input
            value={createdNote.title}
            type="text"
            placeholder='title...'
            onChange={(e) => inputProcessing(e, 'title')}
         />
         <Input
            value={createdNote.body}
            type="text"
            placeholder='note...'
            onChange={(e) => inputProcessing(e, 'body')}
         />
         {!isEdit && <Button onClick={addNewNote}>Add note</Button>}
         {isEdit && <Button onClick={update}>OK</Button>}
         {tagExists && <div className={s.warning}>Tag already created!</div>}
         {tagAddIsVisible &&
            <div className={s.createTag}>
               <div className={s.createTag__text}>
                  <div>Add this tag to note (max 10 symbols):</div>
                  <div className={s.tagAndBtn}>
                     <div className={s.exampleTag}>{tag}</div>
                     <div className={s.addTag} onClick={addNewTag}></div>
                  </div>
               </div>
            </div>
         }
         <div className={s.tagsBlock}>
            {createdNote.tags.map(item =>
               <Tag key={item.id}
                  tag={item} removeTempTag={removeTempTag}
                  isTemporary={true}
               />)}
         </div>
      </div>
   );
}

export default NoteForm;