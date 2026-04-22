export type Division = {
    id: string
    name: string
    slug: string
    description: string | null
    created_at: string
}

export type CreateDivisionDTO = {
    name: string
    slug: string
    description?: string
}

export type UpdateDivisionDTO = {
    name?: string
    slug?: string
    description?: string
}
