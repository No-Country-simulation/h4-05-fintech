import { User } from '@prisma/client';

export const unverifiedUser: User = {
  id: '08f387fe-a249-46a9-b735-33d001611141',
  email: 'unverified@email.com',
  password: '$2b$10$7aDQI4FEzGU3qu5M2HUQkO8be2f9c8EoHOu1IAX7dnXRMIoGw3OPK', // password: unverifiedUser0
  verified: false,
  attempts: 0,
  blocked: false,
  code: '6c1f78b489714f4789816dfa97238b009cf0946ffdfeba6231b1f964f3c682d8',
  expiration: null,
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

export const adminUser: User = {
  id: 'd8edbef7-8946-4f8c-9cd8-7736db79eaf3',
  email: 'admin@email.com',
  password: '$2b$10$ynePFjl3s41y4lZw7tzQaORcJCwfDTzF7s/IF/owHPkMK9vUKbkPW', // password: adminUser2
  verified: true,
  attempts: 0,
  blocked: false,
  code: null,
  expiration: null,
  profileCreated: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const invalidToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5ZjY2ODllLTYxYmYtNDYwYS1iN2M0LWI2MmUxYjkwNjZkNSIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MzMyODA3NzIsImV4cCI6MTczMzI4MDc4Mn0.R4lt06wXYoC5osMOLq1v5UV7PszOswhBLalTnHStNH5';

const expiredToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5ZjY2ODllLTYxYmYtNDYwYS1iN2M0LWI2MmUxYjkwNjZkNSIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE3MzMyODA3NzIsImV4cCI6MTczMzI4MDc4Mn0.R4lt06wXYoC5osMOLq1v5UV7PszOswhBLalTnHStNH4';

const unknownUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzVkNTY1LTM4ODItNDhiMS05ZGY2LWNkOGQ5NTNiOTMwYSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4NTUwNTh9.Il0tycgAJ-VLmQvaQIlczrDV0Sv0hNuPU7vz4GKQNHM';

const normalUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4NjczMTd9.BmyVkOFQmQnzPtzYSJDiCDtHbbJ5ecunHdD7AOGteJA';

const adminUserToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ4ZWRiZWY3LTg5NDYtNGY4Yy05Y2Q4LTc3MzZkYjc5ZWFmMyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTczMzg2NzAxMX0._A89YKPqtR3fA7Z1q2dXQm3J_9oYixhOoTLm3MikzC4';

const invalidRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4NjczMTd9.BwQtOJ7kxbXXWZm8cISWXzlGwou4J0gCbKJ8hZa04FH';

const expiredRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4ODM3MDcsImV4cCI6MTczMzg4MzcwN30.8pPoAt6cuK3yWLDVKJrODWXP_gK_voSf9DV_uRzXsHY';

const normalUserRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0MTViYTFkLTRlZDgtNGIxMy1hZjUxLTIzNDVlYWU4NDMxMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE3MzM4NjczMTd9.BwQtOJ7kxbXXWZm8cISWXzlGwou4J0gCbKJ8hZa04FQ';

export {
  invalidToken,
  expiredToken,
  unknownUserToken,
  normalUserToken,
  adminUserToken,
  invalidRefreshToken,
  expiredRefreshToken,
  normalUserRefreshToken,
};

export const userSeeds: User[] = [unverifiedUser, unverifiedUser2, normalUser, adminUser];
