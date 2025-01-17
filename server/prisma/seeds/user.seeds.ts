import { User } from '@prisma/client';

export const unverifiedUser: User = {
  id: '08f387fe-a249-46a9-b735-33d001611141',
  email: 'unverified@email.com',
  password: '$2b$10$7aDQI4FEzGU3qu5M2HUQkO8be2f9c8EoHOu1IAX7dnXRMIoGw3OPK', // password: unverifiedUser0
  verified: false,
  attempts: 0,
  blocked: false,
  code: '6c1f78b489714f4789816dfa97238b009cf0946ffdfeba6231b1f964f3c682d8',
  profileCreated: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const unverifiedUser2: User = {
  id: 'd59658d9-2c0f-470e-8f1a-ec9ba68e4164',
  email: 'unverified2@email.com',
  password: '$2b$10$7aDQI4FEzGU3qu5M2HUQkO8be2f9c8EoHOu1IAX7dnXRMIoGw3OPK', // password: unverifiedUser0
  verified: false,
  attempts: 0,
  blocked: false,
  code: '89e74c25b5bf6b0d5aad9bf9f6110745274056375db20b66cb81e0d61100b40b',
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
  profileCreated: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const invalidRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4NjczMTd9.BwQtOJ7kxbXXWZm8cISWXzlGwou4J0gCbKJ8hZa04FH';

const expiredRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4ODM3MDcsImV4cCI6MTczMzg4MzcwN30.8pPoAt6cuK3yWLDVKJrODWXP_gK_voSf9DV_uRzXsHY';

const normalUserRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4NjczMTd9.BwQtOJ7kxbXXWZm8cISWXzlGwou4J0gCbKJ8hZa04FQ';

export { invalidRefreshToken, expiredRefreshToken, normalUserRefreshToken };

export const userSeeds: User[] = [unverifiedUser, unverifiedUser2, normalUser];
