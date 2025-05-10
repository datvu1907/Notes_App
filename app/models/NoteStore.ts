import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { NoteModel, Note, ICategory, CATEGORIES } from "./Note"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { compareDesc } from "date-fns"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"

export const NoteStoreModel = types
  .model("NoteStore")
  .props({
    notes: types.optional(types.array(NoteModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    getNotesByCategory(category: ICategory) {
      return self.notes.filter((note) => note.category === category)
    },
    getLatestNotesByCategory(category: ICategory, limit: number = 3) {
      return self.notes
        .filter((note) => note.category === category)
        .sort((a, b) => compareDesc(a.createdAt, b.createdAt))
        .slice(0, limit)
    },
    getNoteCountByCategory(category: ICategory) {
      return self.notes.filter((note) => note.category === category).length
    },
    getAllCategories() {
      return CATEGORIES
    },
  }))
  .actions((self) => ({
    addNote(note: Omit<Note, "id" | "createdAt" | "updatedAt">) {
      if (note.content.length > 200) {
        throw new Error("Note content cannot exceed 200 characters")
      }
      const now = new Date()
      self.notes.push({
        ...note,
        id: uuidv4(),
        createdAt: now.getTime(),
        updatedAt: now.getTime(),
      })
    },
    deleteNote(id: string) {
      const noteIndex = self.notes.findIndex((note) => note.id === id)
      if (noteIndex !== -1) {
        self.notes.splice(noteIndex, 1)
      }
    },
    deleteAllNotes() {
      self.notes.clear()
    },
  }))

export interface NoteStore extends Instance<typeof NoteStoreModel> {}
export interface NoteStoreSnapshotOut extends SnapshotOut<typeof NoteStoreModel> {}
export interface NoteStoreSnapshotIn extends SnapshotIn<typeof NoteStoreModel> {}

// Format a note's creation date
// const formattedDate = format(note.createdAt, "MMM d, yyyy")

// // Check if a note was created today
// const isNoteFromToday = isToday(note.createdAt)

// // Check if a note was created yesterday
// const isNoteFromYesterday = isYesterday(note.createdAt)

// // Get days difference
// const daysSinceCreation = differenceInDays(new Date(), note.createdAt)
