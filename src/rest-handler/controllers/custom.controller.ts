import { Request, Response } from 'express';
import customHandler from '../../custom-mocks/handler.js';
import { MockConfigEndpoint } from '../../typings.js';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = customHandler as Record<string, any>

const customGet = async (req: Request, res: Response, endpoint: MockConfigEndpoint) => {
  try {
    console.log(`GET request received ${req.path} with query ${JSON.stringify(req.query)} and path_params: ${JSON.stringify(req.params)}`)
    if (!endpoint.customRestResponse) {
      res.status(endpoint.successfulStatusCode || 200)
        .send(await handler[endpoint.handlerMethod](req.query, req.params));
    } else {
      await handler[endpoint.handlerMethod](req, res, endpoint)
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

const customPost = async (req: Request, res: Response, endpoint: MockConfigEndpoint) => {
  try {
    console.log(`POST request received ${req.path} with body: ${req.body}`)
    return res.status(endpoint.successfulStatusCode || 200)
      .send(await handler[endpoint.handlerMethod](req.body))
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

export { customGet, customPost };
