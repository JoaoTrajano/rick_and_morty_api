import { Module } from '@nestjs/common'

import { CharacterModule } from './modules'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    CharacterModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
