import { readFile } from 'node:fs/promises';

const readMockFile = async <T> (filePath: string): Promise<T> => {
  const response = await readFile(filePath);
  console.log('Read file content:', response.toString());
  return JSON.parse(response.toString());
};

export { readMockFile };
