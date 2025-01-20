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
    id: {
      type: 'string',
      example: '669a61d3-5dfc-4cca-9e4b-066124594ea6',
    },
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
    financialProfile: {
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
    updatedAt: {
      type: 'date',
      example: new Date(),
    },
    user: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'johndoe@email.com',
        },
        createdAt: {
          type: 'date',
          example: '2024-12-12 20:37:24',
        },
        updatedAt: {
          type: 'date',
          example: '2024-12-12 20:56:37',
        },
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
