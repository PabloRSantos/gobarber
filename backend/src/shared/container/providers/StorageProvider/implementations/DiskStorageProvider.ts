import fs from 'fs';
import { uploadConfig } from '@config/upload';
import path from 'path';
import { IStorageProvider } from '../models/IStorageProvider';

export class DiskStorageProvider implements IStorageProvider {
    async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );

        return file;
    }

    async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}
