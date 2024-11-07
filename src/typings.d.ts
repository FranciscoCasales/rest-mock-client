export interface MockConfigEndpoint {
  path: string;
  httpMethod: 'get' | 'post';
  handlerMethod: string;
  successfulStatusCode: number?;
  customRestResponse: boolean?;
}

export interface MockConfig {
  endpoints: MockConfigEndpoint[];
}

export interface ProxyMethod {
  method: string;
  methodExecutor: (endpoint: MockConfigEndpoint) => void
}
