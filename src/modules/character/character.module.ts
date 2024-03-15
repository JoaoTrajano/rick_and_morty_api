import { Module } from '@nestjs/common'
import { CharacterService } from './application/services/character.service'
import { CharacterController } from './presentation/controllers/character.controller'
import { AxiosAdapterModule } from '@/shared/adapters/http/clients'
import {
  GetASingleCharacterUseCase,
  GetAllCharacterUseCase,
  GetFilterCharactersUseCase,
  GetMultipleCharactersUseCase,
} from './application/usecases'

@Module({
  imports: [
    AxiosAdapterModule.forRoot({ baseURL: 'https://rickandmortyapi.com/api' }),
  ],
  controllers: [CharacterController],
  providers: [
    CharacterService,
    GetAllCharacterUseCase,
    GetASingleCharacterUseCase,
    GetMultipleCharactersUseCase,
    GetFilterCharactersUseCase,
  ],
})
export class CharacterModule {}
