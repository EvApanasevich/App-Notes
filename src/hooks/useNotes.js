import { useMemo } from "react";

export const useSortedByTag = (tagName, notes) => {

   const sortedNotesByTag = useMemo(() => {
      if (tagName) {
         return notes.filter(note => note.tags.some(tag => tag.name === tagName))
      }
      return notes
   }, [tagName, notes])

   return sortedNotesByTag
}

export const useSortedByTitleAndBody = (notes, sortMethod) => {

   const sortedNotes = useMemo(() => {
      if (sortMethod) {
         return [...notes].sort((a, b) => a[sortMethod].localeCompare(b[sortMethod]))
      }
      return notes
   }, [sortMethod, notes])

   return sortedNotes
}

export const useNotes = (notes, sortMethod, query, tagName) => {

   const sortedByTag = useSortedByTag(tagName, notes)
   const sortedNotes = useSortedByTitleAndBody(sortedByTag, sortMethod)

   const sortedAndSearchedNotes = useMemo(() => {
      return sortedNotes.filter(note =>
         note.title.toLowerCase().includes(query.toLowerCase()) ||
         note.body.toLowerCase().includes(query.toLowerCase())
      )
   }, [query, sortedNotes])

   return sortedAndSearchedNotes
}