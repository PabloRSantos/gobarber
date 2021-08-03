import { ITokenProvider } from '../models/ITokenProvider';

export class FakeTokenProvider implements ITokenProvider {
    generate(_: string | object | Buffer, secret: string): string {
        return secret;
    }
}
