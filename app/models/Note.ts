import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export type ICategory = "Work and Study" | "Life" | "Health and Well-being"

export const CATEGORIES: ICategory[] = ["Work and Study", "Life", "Health and Well-being"]

export const NoteModel = types
  .model("Note")
  .props({
    id: types.identifier,
    content: types.string,
    category: types.enumeration("Category", CATEGORIES),
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    updateContent(content: string) {
      if (content.length > 200) {
        throw new Error("Note content cannot exceed 200 characters")
      }
      self.content = content
      self.updatedAt = new Date()
    },
  }))

export interface Note extends Instance<typeof NoteModel> {}
export interface NoteSnapshotOut extends SnapshotOut<typeof NoteModel> {}
export interface NoteSnapshotIn extends SnapshotIn<typeof NoteModel> {}
