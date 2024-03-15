import { ClientEntityInterface } from '../../interface/client-entity.interface'
import axios, { AxiosInstance } from 'axios'

type ConfigClient = {
  baseURL: string
  headers?: any
}

export class AxiosEntity implements ClientEntityInterface<AxiosEntity> {
  public clientAxios: AxiosInstance

  constructor(config: ConfigClient) {
    this.clientAxios = axios.create({
      ...config,
    })
  }

  getClient<AxiosInstance>(): AxiosInstance {
    return this.clientAxios as AxiosInstance
  }
}
