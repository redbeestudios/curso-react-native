export interface Entity {
  id: string
}

export const extractKeyFromEntity = (entity: Entity): string => entity.id
