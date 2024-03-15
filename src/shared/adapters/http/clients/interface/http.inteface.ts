export interface HttpInterface {
  get(url: string, params: any): Promise<any>
}
