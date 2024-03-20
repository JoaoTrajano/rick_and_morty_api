import { ApplicationUseCase } from '@/shared/usecases/interfaces/usecase.interface'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CharacterService, InfosAPI } from '../services/character.service'
import { CharacterAPI } from '../services/character.service'
import { ApplicationOutput } from '@/shared/entities/domain/application-output.entity'
import { CharacterEntity } from '../../domain/entities/character.entity'

export interface GetMultipleCharactersUseCaseOutput {
  results: CharacterAPI[]
}

export interface GetMultipleCharactersUseCaseInput {
  characterIds: string
}

@Injectable()
export class GetMultipleCharactersUseCase
  implements
    ApplicationUseCase<
      GetMultipleCharactersUseCaseInput,
      ApplicationOutput<{
        characters: CharacterEntity[]
        metadata: InfosAPI
      }>
    >
{
  constructor(private readonly characterService: CharacterService) {}

  async execute(input: GetMultipleCharactersUseCaseInput) {
    const result = await this.characterService.findMany(input.characterIds)
    if (!result) throw new NotFoundException('Personagem não encontrado!')

    return new ApplicationOutput({
      characters: result.characters,
      metadata: result.metadata,
    })
  }
}
