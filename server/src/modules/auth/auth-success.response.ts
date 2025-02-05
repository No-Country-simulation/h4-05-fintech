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

const accessTokenResponse = (): SchemaObject => {
  return {
    type: 'object',
    properties: {
      accessToken: {
        type: 'string',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4ODM3MDcsImV4cCI6MTczMzg4MzcwN30.8pPoAt6cuK3yWLDVKJrODWXP_gK_voSf9DV_uRzXsHY',
      },
    },
  };
};

export const RegistrySuccess: ApiResponseNoStatusOptions = {
  description: 'User successfully registered',
  schema: successMessage('user successfully created'),
};

export const VerificationResendSuccess: ApiResponseNoStatusOptions = {
  description: 'Verification email successfully resent',
  schema: successMessage('Verification email successfully resent'),
};

export const VerifySuccess: ApiResponseNoStatusOptions = {
  description: 'User successfully verified',
  schema: successMessage('user successfully verified'),
};

export const LoginSucess: ApiResponseNoStatusOptions = {
  description: 'Successfully logged in',
  schema: accessTokenResponse(),
};

export const RefreshSucess: ApiResponseNoStatusOptions = {
  description: 'Successfully refreshed',
  schema: accessTokenResponse(),
};

export const LogoutSuccess: ApiResponseNoStatusOptions = {
  description: 'Successfully logged out',
  schema: successMessage('successfully logged out'),
};

export const PasswordChangeSuccess = {
  description: 'Password change success',
  schema: successMessage('password successfully changed'),
};

export const PasswordRecoveryInitialized = {
  description: 'Password recovery initialized',
  schema: successMessage('password recovery process initialized'),
};

export const ResetPasswordCodeVerified: ApiResponseNoStatusOptions = {
  description: 'User successfully verified',
  schema: successMessage('Reset password code successfully verified'),
};

export const PasswordResetSuccess = {
  description: 'Password reset success',
  schema: successMessage('password successfully reset'),
};
