import { Router } from 'express'
import { customGet, customPost } from '../controllers/custom.controller.js'
import { MockConfig, MockConfigEndpoint, ProxyMethod } from '../../typings.js'
import customHandler from "../../custom-mocks/handler.js";

class CustomRouterProxy {
  #allowedMethods = ['get', 'post']
  #router: Router
  #methods: ProxyMethod[]

  constructor(router: Router) {
    this.#router = router
    this.#methods = this.#initializeMethods()
  }

  #initializeMethods() {
    return [
      {
        method: 'post',
        methodExecutor: (endpoint: MockConfigEndpoint) =>
          this.#router.post(endpoint.path, (req, res) => customPost(req, res, endpoint))
      },
      {
        method: 'get',
        methodExecutor: (endpoint: MockConfigEndpoint) =>
          this.#router.get(endpoint.path, (req, res) => customGet(req, res, endpoint))
      }
    ]
  }

  configure(mockConfig: MockConfig) {
    for (const endpoint of mockConfig.endpoints) {
      this.#routeEndpoint(endpoint)
    }
  }

  #routeEndpoint(endpoint: MockConfigEndpoint) {
    console.log(`Routing endpoint ${JSON.stringify(endpoint)}`)
    if (!endpoint) {
      console.error(`Invalid endpoint configuration ${endpoint}`)
      return
    }
    const isValidMethod = endpoint.httpMethod && this.#allowedMethods.includes(endpoint.httpMethod.toLowerCase())
    if (!isValidMethod) {
      console.error(`Invalid provided method ${endpoint.httpMethod}`)
      return
    }
    if (!endpoint.path) {
      console.error(`Invalid provided path: ${endpoint.httpMethod}`)
      return
    }
    const hasValidHandlerMethod = Boolean(endpoint.handlerMethod) && Object.prototype.hasOwnProperty.call(customHandler, endpoint.handlerMethod)
    if (!hasValidHandlerMethod) {
      this.#router[endpoint.httpMethod](
        endpoint.path,
        (_req, res) => res.status(404).send({message: 'Handler method not found'})
      )
    }
    const currentMethod = this.#methods.find(method => method.method === endpoint.httpMethod)
    if (!currentMethod) {
      console.error(`Current method not found: ${endpoint.httpMethod}`)
      return
    }
    const { methodExecutor } = currentMethod
    methodExecutor(endpoint)
  }

}

export { CustomRouterProxy }
