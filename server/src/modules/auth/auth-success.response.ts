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

export const LoginSucess: ApiResponseNoStatusOptions = {
  description: 'Successfully logged in',
  schema: {
    type: 'object',
    properties: {
      accessToken: {
        type: 'string',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4ODM3MDcsImV4cCI6MTczMzg4MzcwN30.8pPoAt6cuK3yWLDVKJrODWXP_gK_voSf9DV_uRzXsHY',
      },
    },
  },
};

export const RefreshSucess: ApiResponseNoStatusOptions = {
  description: 'Successfully refreshed',
  schema: {
    type: 'object',
    properties: {
      accessToken: {
        type: 'string',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4ODM3MDcsImV4cCI6MTczMzg4MzcwN30.8pPoAt6cuK3yWLDVKJrODWXP_gK_voSf9DV_uRzXsHY',
      },
    },
  },
};

export const LogoutSuccess: ApiResponseNoStatusOptions = {
  description: 'Successfully logged out',
  schema: successMessage('successfully logged out'),
};

export const PasswordRecoveryInitialized = {
  description: 'Password recovery initialized',
  schema: successMessage('password recovery process initialized'),
};

export const PasswordResetSuccess = {
  description: 'Password reset success',
  schema: successMessage('password successfully reset'),
};
