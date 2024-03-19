import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const PORT = 3001
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  })

  const config = new DocumentBuilder()
    .setTitle('API Rick and Morty')
    .setDescription(
      'This project implement the api https://rickandmortyapi.com/',
    )
    .setVersion('1.0')
    .addTag('API Rick and Morty')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  Logger.log(`API run in http://localhost:${PORT}`)
  await app.listen(PORT)
}
bootstrap()
