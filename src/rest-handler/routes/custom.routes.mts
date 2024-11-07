import { Router } from 'express';
import { MockConfig } from '../../typings.js';
import { readMockFile } from '../utils/readFiles.util.js';
import { resolveFilePath } from '../utils/resolvePath.util.js';
import { CustomRouterProxy } from '../proxy/custom-routes-proxy.mjs';

const customRoutes = Router();
const mockConfigPath = resolveFilePath('mock.config.json', 'custom-mocks');
const mockConfig = await readMockFile<MockConfig>(mockConfigPath);
console.log('Mock config found in mock.config:', mockConfig);
const customRouterProxy = new CustomRouterProxy(customRoutes)
customRouterProxy.configure(mockConfig)

export default customRoutes;
