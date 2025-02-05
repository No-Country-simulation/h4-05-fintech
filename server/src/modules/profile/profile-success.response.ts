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

export const userProfileDataSchema: SchemaObject = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'John',
    },
    lastname: {
      type: 'string',
      example: 'Doe',
    },
    image: {
      type: 'string',
      example: 'image/669a61d3-5dfc-4cca-9e4b-066124594ea6',
    },
    itemsSaved: {
      type: 'array',
      items: {
        type: 'string',
        example: ['news', 'url'],
      },
    },
    email: {
      type: 'string',
      example: 'johndoe@email.com',
    },
    profile: {
      type: 'string',
      example: 'Moderado',
    },
    recommendations: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    tips: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};

export const FinancialProfileSuccess: ApiResponseNoStatusOptions = {
  description: 'User successfully registered',
  schema: successMessage('financial profile created'),
};

export const UserProfileDataResponse: ApiResponseNoStatusOptions = {
  description: 'User successfully registered',
  schema: userProfileDataSchema,
};

export const ProfileUpdateSuccess: ApiResponseNoStatusOptions = {
  description: 'Profile successfully updated',
  schema: successMessage('profile successfully updated'),
};
