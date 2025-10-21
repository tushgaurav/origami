export interface BookmarkItem {
  id: number
  title: string
  url: string
  description: string
  icon: string
  createdAt: string
  updatedAt: string
}

export interface BookmarksQuery {
  query?: string
  sort?: "recently-added" | "recently-edited"
}


