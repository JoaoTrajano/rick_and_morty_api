import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import {
  GetAllCharacterUseCase,
  GetASingleCharacterUseCase,
  GetMultipleCharactersUseCase,
  GetFilterCharactersUseCase,
} from '../../application/usecases'
import { CharacterPresenter } from '../presenters/character.presenter'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { ApplicationOutput } from '@/shared/entities/domain/application-output.entity'

@ApiTags('character')
@Controller('character')
export class CharacterController {
  constructor(
    private readonly getMultipleCharactersUseCase: GetMultipleCharactersUseCase,
    private readonly getFilterCharactersUseCase: GetFilterCharactersUseCase,
    private readonly getASingleCharacterUseCase: GetASingleCharacterUseCase,
    private readonly getAllCharacterUseCase: GetAllCharacterUseCase,
  ) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Retorna todos os personagens',
    type: ApplicationOutput,
  })
  async findAll() {
    const result = await this.getAllCharacterUseCase.execute()
    const resultMappeded = CharacterPresenter.mapCharactersFromOutput(result)
    return resultMappeded.toHttpResponse()
  }

  @Get(':characterId')
  async findOne(@Param('characterId', ParseIntPipe) characterId: number) {
    const result = await this.getASingleCharacterUseCase.execute({
      characterId,
    })
    const resultMappeded = CharacterPresenter.mapCharacterFromOutput(result)
    return resultMappeded.toHttpResponse()
  }

  @Get('/search/:characterIds')
  async findMany(@Param('characterIds') characterIds: string) {
    const result = await this.getMultipleCharactersUseCase.execute({
      characterIds,
    })
    const resultMappeded = CharacterPresenter.mapCharactersFromOutput(result)
    return resultMappeded.toHttpResponse()
  }

  @Get('/filter')
  async filterCharacters(@Query() query) {
    const result = await this.getFilterCharactersUseCase.execute({
      fields: query,
    })

    const resultMappeded = CharacterPresenter.mapCharactersFromOutput(result)

    return resultMappeded.toHttpResponse()
  }
}
