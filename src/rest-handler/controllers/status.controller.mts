import { Request, Response } from 'express';

const health = async (_req: Request, res: Response) => {
  res.send({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
};

const ready = async (_req: Request, res: Response) => {
  res.send({
    status: "ready",
    timestamp: new Date().toISOString()
  });
};

export { health, ready };
