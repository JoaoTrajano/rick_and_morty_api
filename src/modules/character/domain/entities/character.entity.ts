import { Entity } from '@/shared/entities/domain/entity'

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
  public name: string
  public status: 'alive' | 'dead' | 'unknown'
  public species: string
  public type: string
  public gender: string
  public origin: Origin
  public location: Location
  public image: string
  public episode: string[]
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
