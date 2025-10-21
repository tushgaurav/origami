export interface ApplicationItem {
    id: number
    title: string
    url: string
    description: string
    icon: string
    createdAt: string
    updatedAt: string
}

export interface ApplicationsQuery {
    query?: string
    sort?: "recently-added" | "recently-edited"
}



