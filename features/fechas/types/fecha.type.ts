export type Fecha = {
  id: string
  name: string
  created_at: string
}

export type CreateFechaDTO = {
  name: string
}

export type UpdateFechaDTO = {
  name?: string
}