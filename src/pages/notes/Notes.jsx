import React, { useEffect, useState } from "react";
import NotesList from '../../components/notes-list/NotesList'
import NoteForm from "../../components/note-form/NoteForm";
import NoteFilter from "../../components/note-filter/NoteFilter";
import Tag from "../../components/UI/tag/Tag";
import { useNotes } from "../../hooks/useNotes";
import s from "./Notes.module.scss";
import data from "../../data.json";

function Notes() {
   useEffect(() => {
      setNotes(data)
   }, [])
   const [notes, setNotes] = useState([])
   const [filter, setFilter] = useState({ sort: '', query: '', tagName: '' })
   const sortedAndSearchedNotes = useNotes(notes, filter.sort, filter.query, filter.tagName)

   const removeNote = (noteId) => {
      setNotes(notes.filter(note => note.id !== noteId))
   }
   const createNote = (newNote) => {
      setNotes([...notes, newNote])
   }
   const updateNote = (updatedNote, noteId) => {
      setNotes(notes.map(note => {
         if (note.id === noteId) {
            return updatedNote
         }
         return note
      })
      )
   }
   const filterNotesByTag = (tagName) => {
      setFilter({ ...filter, tagName: tagName })
   }

   const takeUniqueTags = (notes) => {
      const result = []
      notes.forEach(note => note.tags.forEach(tag => {
         if (!result.length) {
            result.push(tag)
         } else if (!result.find(item => item.name === tag.name)) {
            result.push(tag)
         }
      }))
      return result
   }

   return (
      <div className={s.app}>
         <div className={s.app__container}>
            <div className={s.tagsList__container}>
               <div className={s.tagsList__container_Btn} onClick={() => setFilter({ sort: '', query: '', tagName: '' })}>
                  Show all notes
               </div>
               <div className={s.tagsList__container_list}>
                  {takeUniqueTags(notes).map(tag =>
                     <Tag key={tag.id} tag={tag} isList={true} filterNotesByTag={filterNotesByTag} />
                  )}
               </div>
            </div>
            <div className={s.notes}>
               <div className={s.manipulationBlock}>
                  <div className={s.manipulationBlock__createForm}>
                     <NoteForm createNote={createNote} removeNote={removeNote} />
                  </div>
                  <div className={s.manipulationBlock__filter}>
                     <NoteFilter
                        filter={filter}
                        setFilter={setFilter}
                     />
                  </div>
               </div>
               <div className={s.notesListContainer}>
                  <NotesList
                     removeNote={removeNote}
                     notes={sortedAndSearchedNotes}
                     createNote={createNote}
                     updateNote={updateNote}
                     filter={filter}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Notes;
