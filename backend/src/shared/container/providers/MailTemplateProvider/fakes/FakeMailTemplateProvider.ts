import { IParseMailTemplateDTO } from '../dtos/IParseMailTemplateDTO';
import { IMailTemplateProvider } from '../models/IMailTemplateProvider';

export class FakeMailTemplateProvider implements IMailTemplateProvider {
    async parse({ file }: IParseMailTemplateDTO): Promise<string> {
        return file;
    }
}
