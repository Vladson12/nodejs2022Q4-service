import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest<
      IncomingMessage & { token?: Record<string, unknown> }
    >(context);
    try {
      const token = this.getToken(request);
      const verifiedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request.token = verifiedToken;
      return true;
    } catch (e) {
      return false;
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: {
    headers: Record<string, string | string[]>;
  }): string {
    const authorization = request.headers['Authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = authorization.split(' ');
    return token;
  }
}
