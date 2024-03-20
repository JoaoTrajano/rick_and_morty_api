import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
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
      'This project implements the API from https://rickandmortyapi.com/',
    )
    .setVersion('1.0')
    .addTag('character')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT || 8080, '0.0.0.0')
}

bootstrap()
