export interface Note {
  id: string // unique ID, e.g., uuid
  content: string
  createdAt: string // ISO string
}

// Each category contains an array of notes
export interface Category {
  name: "Work and Study" | "Life" | "Health and Well-being"
  notes: Note[]
}
