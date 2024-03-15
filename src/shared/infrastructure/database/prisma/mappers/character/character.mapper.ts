import { CharacterAPI } from '@/modules/character/application/services/character.service'
import { CharacterEntity } from '@/modules/character/domain/entities/character.entity'

export class CharacterMapper {
  static toDomain(schema: CharacterAPI): CharacterEntity {
    const entity = new CharacterEntity(
      schema.name,
      schema.status as 'alive' | 'dead' | 'unknown',
      schema.species,
      schema.type,
      schema.gender,
      schema.origin,
      schema.location,
      schema.image,
      schema.episode,
      schema.url,
    )
    entity.id = schema.id
    entity.createdAt = schema.created
    return entity
  }
}
