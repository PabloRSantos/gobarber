import { SignOptions } from 'jsonwebtoken';

export interface ITokenProvider {
    generate(
        payload: string | Buffer | object,
        secret: string,
        options?: SignOptions,
    ): string;
}
