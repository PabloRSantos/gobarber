import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { routes } from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';
import { uploadConfig } from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import { errors } from 'celebrate';
import cors from 'cors';
import { rateLimiter } from './middlewares/RateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());

app.use(
    (
        err: Error,
        _: Request,
        response: Response,
        __: NextFunction,
    ): Response => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ status: 'error', message: err.message });
        }

        return response.status(500).json({
            status: 'error',
            message: err.message,
            // message: 'Internal server error',
        });
    },
);

app.listen(3333, () => console.log('Server started on port 3333!'));
