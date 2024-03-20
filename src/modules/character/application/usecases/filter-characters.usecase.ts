import { ApplicationUseCase } from '@/shared/usecases/interfaces/usecase.interface'
import { Injectable } from '@nestjs/common'
import { CharacterService, InfosAPI } from '../services/character.service'
import { CharacterAPI } from '../services/character.service'
import { ApplicationOutput } from '@/shared/entities/domain/application-output.entity'
import { CharacterEntity } from '../../domain/entities/character.entity'

export interface GetFilterCharactersUseCaseOutput {
  results: CharacterAPI[]
}

export interface GetFilterCharactersUseCaseInput {
  fields: any
}

ApplicationOutput<{
  characters: CharacterEntity[]
  metadata: InfosAPI
}>

@Injectable()
export class GetFilterCharactersUseCase
  implements
    ApplicationUseCase<GetFilterCharactersUseCaseInput, ApplicationOutput>
{
  constructor(private readonly characterService: CharacterService) {}

  async execute(input: GetFilterCharactersUseCaseInput) {
    const result = await this.characterService.filterCharacters(input.fields)
    if (!result) throw new Error()

    return new ApplicationOutput(
      { characters: result.characters },
      { metadata: result.metadata },
    )
  }
}
