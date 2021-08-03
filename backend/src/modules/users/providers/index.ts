import { container } from 'tsyringe';
import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';
import { JwtProvider } from './TokenProvider/implementations/JwtProvider';
import { ITokenProvider } from './TokenProvider/models/ITokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JwtProvider);
