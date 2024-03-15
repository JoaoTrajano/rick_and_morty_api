import { ApplicationOutput } from '@/shared/entities/domain/application-output.entity'
import { CharacterEntity } from '../../domain/entities/character.entity'

export class CharacterPresenter {
  static mapCharactersFromOutput(
    output: ApplicationOutput<{ characters: CharacterEntity[] }>,
  ): ApplicationOutput {
    ;(output as ApplicationOutput).value = {
      characters: output.value.characters.map(
        CharacterPresenter.mapRequestFromInput,
      ),
    }

    return output
  }

  static mapRequestFromInput(character: CharacterEntity) {
    return {
      ...character,
    }
  }

  static mapCharacterFromOutput(
    output: ApplicationOutput<{ character: CharacterEntity }>,
  ): ApplicationOutput {
    ;(output as ApplicationOutput).value = {
      character: {
        ...output.value.character,
      },
    }
    return output
  }
}
