export interface ClientEntityInterface<ClientInstance> {
  getClient<Instance = ClientInstance>(): Instance
}
