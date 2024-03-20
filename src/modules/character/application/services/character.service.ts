import { AxiosAdapter } from '@/shared/adapters/http/clients'
import { Injectable } from '@nestjs/common'
import { CharacterMapper } from '@/shared/infrastructure/database/prisma/mappers/character/character.mapper'
import { CharacterEntity } from '../../domain/entities/character.entity'

export interface CharacterAPI {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface InfosAPI {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface ApiResponse {
  data: {
    info: InfosAPI
    results: CharacterAPI[] | CharacterAPI
  }
}

@Injectable()
export class CharacterService {
  constructor(private readonly clientAxiosAdapter: AxiosAdapter) {}

  async findAll(): Promise<{
    characters: CharacterEntity[]
    metadata: InfosAPI
  }> {
    const resultApi =
      await this.clientAxiosAdapter.get<ApiResponse>('/character')

    const characters = (resultApi.data.results as CharacterAPI[]).map(
      CharacterMapper.toDomain,
    )
    const metadata = resultApi.data.info

    return { characters, metadata }
  }

  async findOne(id: number): Promise<{
    character: CharacterEntity
  }> {
    const result = await this.clientAxiosAdapter.get<ApiResponse>(
      `/character/${id}`,
    )
    return {
      character: CharacterMapper.toDomain(
        result.data as unknown as CharacterAPI,
      ),
    }
  }

  async findMany(
    characterIds: string,
  ): Promise<{ characters: CharacterEntity[]; metadata: InfosAPI }> {
    const resultApi = await this.clientAxiosAdapter.get<ApiResponse>(
      `/character/${characterIds}`,
    )
    const characters = (resultApi.data as unknown as CharacterAPI[]).map(
      CharacterMapper.toDomain,
    )
    const metadata = resultApi.data.info

    return { characters, metadata }
  }

  async filterCharacters(
    fields: any,
  ): Promise<{ characters: CharacterEntity[]; metadata: InfosAPI } | null> {
    try {
      const resultApi = await this.clientAxiosAdapter.get<ApiResponse>(
        '/character',
        {
          ...fields,
        },
      )
      if (!resultApi) return null

      const characters = (resultApi.data.results as CharacterAPI[]).map(
        CharacterMapper.toDomain,
      )

      return { characters, metadata: resultApi.data.info }
    } catch (error) {
      return null
    }
  }
}
