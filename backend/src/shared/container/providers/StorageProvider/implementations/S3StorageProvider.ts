import fs from 'fs';
import { uploadConfig } from '@config/upload';
import path from 'path';
import { S3 } from 'aws-sdk';
import mime from 'mime';
import { IStorageProvider } from '../models/IStorageProvider';

export class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: 'us-east-1',
        });
    }

    async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalPath);

        const ContentType = mime.lookup(originalPath);

        if (!ContentType) {
            throw new Error('File not found');
        }

        await this.client
            .putObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
            .promise();

        await fs.promises.unlink(originalPath);

        return file;
    }

    async deleteFile(file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: file,
            })
            .promise();
    }
}
