import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}

export const getValidationErrors = (err: ValidationError): Errors => {
    const validationErrors: Errors = {};

    err.inner.forEach((error) => {
        if (error.path) validationErrors[error.path] = error.message;
    });

    return validationErrors;
};
