import { resolve } from 'node:path';

const resolveFilePath = (fileName?: string, ...filePaths: Array<string>): string => {
  const { pathname } = new URL('..', import.meta.url);
  const file = fileName || '';
  const fileDirectory = resolve(pathname, '..', ...filePaths, file);
  console.log('File directory resolved:', fileDirectory);
  return fileDirectory;
};

export { resolveFilePath };
