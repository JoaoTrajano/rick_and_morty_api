import { Entity } from '@/shared/entities/domain/entity'
import { ApiProperty } from '@nestjs/swagger'
export type Origin = {
  name: string
  url: string
}

export type Location = {
  name: string
  url: string
}

export type CharacterProps = {
  name: string
  status: 'alive' | 'dead' | 'unknown'
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: string[]
  url: string
}

export class CharacterEntity extends Entity {
  @ApiProperty()
  public name: string

  @ApiProperty()
  public status: 'alive' | 'dead' | 'unknown'

  @ApiProperty()
  public species: string

  @ApiProperty()
  public type: string

  @ApiProperty()
  public gender: string

  @ApiProperty()
  public origin: Origin

  @ApiProperty()
  public location: Location

  @ApiProperty()
  public image: string

  @ApiProperty()
  public episode: string[]

  @ApiProperty()
  public url: string

  constructor(
    name: string,
    status: 'alive' | 'dead' | 'unknown',
    species: string,
    type: string,
    gender: string,
    origin: Origin,
    location: Location,
    image: string,
    episode: string[],
    url: string,
  ) {
    super()
    this.name = name
    this.status = status
    this.species = species
    this.type = type
    this.gender = gender
    this.origin = origin
    this.location = location
    this.image = image
    this.episode = episode
    this.url = url
  }

  isGender(gender: string): boolean {
    return this.gender.toLowerCase() === gender.toLowerCase()
  }

  appearsInEpisode(episodeUrl: string): boolean {
    return this.episode.includes(episodeUrl)
  }

  getOriginName(): string {
    return this.origin.name
  }

  getLocationName(): string {
    return this.location.name
  }
}
