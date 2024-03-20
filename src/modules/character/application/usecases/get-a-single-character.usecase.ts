import { ApplicationUseCase } from '@/shared/usecases/interfaces/usecase.interface'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CharacterService } from '../services/character.service'
import { ApplicationOutput } from '@/shared/entities/domain/application-output.entity'
import { CharacterEntity } from '../../domain/entities/character.entity'

export interface GetASingleCharacterUseCaseInput {
  characterId: number
}

@Injectable()
export class GetASingleCharacterUseCase
  implements
    ApplicationUseCase<
      GetASingleCharacterUseCaseInput,
      ApplicationOutput<{
        character: CharacterEntity
      }>
    >
{
  constructor(private readonly characterService: CharacterService) {}

  async execute(input: GetASingleCharacterUseCaseInput) {
    const result = await this.characterService.findOne(input.characterId)
    if (!result) throw new NotFoundException('Personagem não encontrado!')

    return new ApplicationOutput({ ...result })
  }
}
