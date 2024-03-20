import { DynamicModule, Injectable, Module, Provider } from '@nestjs/common'
import { HttpInterface } from '../interface/http.inteface'
import { AxiosEntity } from './entities/axios.entity'
import { AxiosInstance as ClientInstance } from 'axios'

export type ConfigClient = {
  baseURL: string
  headers?: any
}

@Injectable()
export class AxiosAdapter implements HttpInterface {
  private client: AxiosEntity

  constructor(config: ConfigClient) {
    this.client = new AxiosEntity({
      ...config,
    })
  }

  async get<ApiResponse = unknown, Params = any>(
    path: string,
    params?: Params,
  ): Promise<ApiResponse | null> {
    try {
      const data = (await this.client
        .getClient<ClientInstance>()
        .get(path, { params })) as ApiResponse
      return data
    } catch (error) {
      return null
    }
  }
}

export const createClientProvider = (config: ConfigClient): Provider => ({
  provide: AxiosAdapter,
  useValue: new AxiosAdapter(config),
})

@Module({})
export class AxiosAdapterModule {
  static forRoot(config: ConfigClient): DynamicModule {
    const clientProvider = createClientProvider(config)
    return {
      module: AxiosAdapterModule,
      providers: [clientProvider],
      exports: [clientProvider],
    }
  }
}
