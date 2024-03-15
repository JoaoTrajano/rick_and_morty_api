import { CharacterEntity } from '../../character.entity'

describe('CharacterEntity', () => {
  const origin = {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/location/1',
  }

  const location = {
    name: 'Earth - Dimension C-137',
    url: 'https://rickandmortyapi.com/api/location/1',
  }

  const character = new CharacterEntity(
    'Rick Sanchez',
    'alive',
    'Human',
    '',
    'Male',
    origin,
    location,
    'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    ['https://rickandmortyapi.com/api/episode/1'],
    'https://rickandmortyapi.com/api/character/1',
  )

  it('should return correct origin name', () => {
    expect(character.getOriginName()).toBe('Earth')
  })

  it('should return correct location name', () => {
    expect(character.getLocationName()).toBe('Earth - Dimension C-137')
  })

  it('should check if character is of a specific gender', () => {
    expect(character.isGender('male')).toBe(true)
    expect(character.isGender('female')).toBe(false)
  })

  it('should check if character appears in a specific episode', () => {
    expect(
      character.appearsInEpisode('https://rickandmortyapi.com/api/episode/1'),
    ).toBe(true)
    expect(
      character.appearsInEpisode('https://rickandmortyapi.com/api/episode/2'),
    ).toBe(false)
  })
})
