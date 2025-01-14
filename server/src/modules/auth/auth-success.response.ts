import { ApiResponseNoStatusOptions } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const successMessage = (message: string): SchemaObject => {
  return {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: message,
      },
    },
  };
};

export const RegistrySuccess: ApiResponseNoStatusOptions = {
  description: 'User successfully registered',
  schema: successMessage('user successfully created'),
};

export const VerifySuccess: ApiResponseNoStatusOptions = {
  description: 'User successfully verified',
  schema: successMessage('user successfully verified'),
};
