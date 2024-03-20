import { ApplicationUseCase } from '@/shared/usecases/interfaces/usecase.interface'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CharacterService, InfosAPI } from '../services/character.service'
import { CharacterEntity } from '../../domain/entities/character.entity'
import { ApplicationOutput } from '@/shared/entities/domain/application-output.entity'

ApplicationOutput<{
  characters: CharacterEntity[]
  metadata: InfosAPI
}>

@Injectable()
export class GetAllCharacterUseCase
  implements ApplicationUseCase<unknown, ApplicationOutput>
{
  constructor(private readonly characterService: CharacterService) {}

  async execute() {
    const result = await this.characterService.findAll()
    if (!result) throw new NotFoundException('Personagem não encontrado!')

    return new ApplicationOutput(
      { characters: result.characters },
      { metadata: result.metadata },
    )
  }
}
