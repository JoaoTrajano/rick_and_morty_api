import { Module } from '@nestjs/common'

import { CharacterModule } from './modules'

@Module({
  imports: [CharacterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
