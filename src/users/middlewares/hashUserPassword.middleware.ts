import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createHash } from 'crypto';

@Injectable()
export class HashUserPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.body.password_hash = createHash('md5')
      .update(req.body.password_hash)
      .digest('hex');
    next();
  }
}
