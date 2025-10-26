export interface BookmarkItem {
  id: number
  category_id: number | null
  title: string
  url: string
  createdAt: string
  updatedAt: string
}

export interface BookmarksQuery {
  query?: string
  sort?: "recently-added" | "recently-edited"
}

export interface BookmarkCategoryItem {
  id: number
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
}


