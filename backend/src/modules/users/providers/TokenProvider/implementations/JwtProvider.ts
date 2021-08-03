import { sign, SignOptions } from 'jsonwebtoken';
import { ITokenProvider } from '../models/ITokenProvider';

export class JwtProvider implements ITokenProvider {
    generate(
        payload: string | object | Buffer,
        secret: string,
        options?: SignOptions,
    ): string {
        return sign(payload, secret, options);
    }
}
