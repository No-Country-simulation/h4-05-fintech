import { User } from '@prisma/client';

export const unverifiedUser: User = {
  id: '08f387fe-a249-46a9-b735-33d001611141',
  email: 'unverified@email.com',
  password: '$2b$10$7aDQI4FEzGU3qu5M2HUQkO8be2f9c8EoHOu1IAX7dnXRMIoGw3OPK', // password: unverifiedUser0
  verified: false,
  attempts: 0,
  blocked: false,
  code: null,
  expiration: null,
  profileCreated: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const normalUser: User = {
  id: '9415ba1d-4ed8-4b13-af51-2345eae84313',
  email: 'normal@email.com',
  password: '$2b$10$d/CtDc73X0pM8JoEuA9A4u7MNEAAE45/fcQTQxG1BLSeV8ZAaC/h2', // password: normalUser1
  verified: true,
  attempts: 0,
  blocked: false,
  code: null,
  expiration: null,
  profileCreated: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userSeeds: User[] = [unverifiedUser, normalUser];
