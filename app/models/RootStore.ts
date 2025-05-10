import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { NoteStoreModel } from "./NoteStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  noteStore: types.optional(NoteStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshotOut extends SnapshotOut<typeof RootStoreModel> {}
export interface RootStoreSnapshotIn extends SnapshotIn<typeof RootStoreModel> {}
