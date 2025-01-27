import { User } from '@prisma/client';

export const unverifiedUser: User = {
  id: '08f387fe-a249-46a9-b735-33d001611141',
  email: 'unverified@email.com',
  password: '$2b$10$7aDQI4FEzGU3qu5M2HUQkO8be2f9c8EoHOu1IAX7dnXRMIoGw3OPK', // password: unverifiedUser0
  verified: false,
  attempts: 0,
  blocked: false,
  verificationCode: '1cc2f0782b47bee085d0750e824e16c6f8ad0bcdad030d8888f6854a0811b0bb',
  resetPasswordCode: null,
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
  verificationCode: '6c49b62cac771d1a2c8e8899f30cf811dfe9596bd6eaf7f7024b6bc48766fbcc',
  resetPasswordCode: null,
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
  verificationCode: null,
  resetPasswordCode: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userToBlock: User = {
  id: '1589e36b-dfe9-44c4-8932-11ef1ce1b1a7',
  email: 'usertoblock@email.com',
  password: '$2b$10$d/CtDc73X0pM8JoEuA9A4u7MNEAAE45/fcQTQxG1BLSeV8ZAaC/h2', // password: normalUser1
  verified: true,
  attempts: 4,
  blocked: false,
  verificationCode: null,
  resetPasswordCode: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const blockedUser: User = {
  id: '057e0418-18c7-4bed-964f-911446f8ea6f',
  email: 'blockeduser@email.com',
  password: '$2b$10$d/CtDc73X0pM8JoEuA9A4u7MNEAAE45/fcQTQxG1BLSeV8ZAaC/h2', // password: normalUser1
  verified: true,
  attempts: 5,
  blocked: true,
  verificationCode: null,
  resetPasswordCode: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const forgotPasswordUser: User = {
  id: '055e587d-532f-411b-a98e-c00b09f9ce02',
  email: 'forgotpassword@email.com',
  password: '$2b$10$d/CtDc73X0pM8JoEuA9A4u7MNEAAE45/fcQTQxG1BLSeV8ZAaC/h2', // password: normalUser1
  verified: true,
  attempts: 0,
  blocked: false,
  verificationCode: null,
  resetPasswordCode: '45cf303dff2954150f614cb744f3e093a6e1d0a083366928880a08c6caeeb5cd',
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
  verificationCode: null,
  resetPasswordCode: null,
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

const adminUserRefreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ4ZWRiZWY3LTg5NDYtNGY4Yy05Y2Q4LTc3MzZkYjc5ZWFmMyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTczMzg2NzAxMX0.NLLVsFLHkXZmKKpTTWiYS4LRUh2d1BIwkKvxw7jaBz4';

const invalidCodeForVerification =
  'e62d8f32d14b94c8d37ebdc6aa143bad.8247b02d394b5fddc6ef9a5a9b2e0302';

const userNotFoundForVerification =
  '330ebc7146dd30c562babc12202308b8.8b9b82c8b8366c791d094203fe9fbf076545b616e3712f8f4396fe9f57b6932f645aa2c2ed850ecf36efb68316e40407f80226dd575250f9290d0db2e1526777cd311ec639b89100374640e3adee9254';

const codeForVerification1 =
  '7a495db7048391ef879d9527d67f34ec.af5f73695e6a4d04602faec9e5a1622103b2f562aa2f781e9529dac0c47959db74bcdf690e662213b4ee93d4f5d1220d246e3c820c664a140a4b57a043d58a22cc59229434b6493e3f5cacc6efc3532f';

const codeForVerification2 =
  '7a495db7048391ef879d9527d67f34ec.86940ea9304a3c13f74c55e65e016fc3379987ec6798aee8aa7a0292f4e9098b329dccb489227a447193261e980c4ad45a03745c5d975b671f9d1475f5f245c09aedd9b0442c83c36edd6110fd87d2c8';

const invalidCodeForPasswordReset =
  'fa30b87a599a6d60f7b3fadb1d150b2c.62408d9a6da2edeff7433fe8362ad604104bc15610c8733aaa853c3162a1d928';

const userNotFoundForPasswordReset =
  '0cf481c3e8312211b856fe3df6233d41.9fd6b6d01e0d4eeb99f6e42f3057d65c226668098df8854180940046cc39cbf65741488c66af775c200069296a8c3f709d313b9f87c0c6de60f043261c251aacf1fb6b853565ffb103be1277f4086b70';

const expiredCodeForPasswordReset =
  '7d3a5edbd257e429681d42e52a83aff5.97a7aabb2ef4402719ab0a39e3b1b635df5c482621603b96b693d12ede03027c088dc0b85ecf408f650a11ab7bd2ea6393ce40c12e62a060a9ab3c580e3431147bc846ee8ed2ebb23e666f2389939dd0';

export {
  invalidToken,
  expiredToken,
  unknownUserToken,
  normalUserToken,
  adminUserToken,
  invalidRefreshToken,
  expiredRefreshToken,
  normalUserRefreshToken,
  adminUserRefreshToken,
  invalidCodeForVerification,
  userNotFoundForVerification,
  codeForVerification1,
  codeForVerification2,
  invalidCodeForPasswordReset,
  userNotFoundForPasswordReset,
  expiredCodeForPasswordReset,
};

export const userSeeds: User[] = [
  unverifiedUser,
  unverifiedUser2,
  userToBlock,
  blockedUser,
  forgotPasswordUser,
  normalUser,
  adminUser,
];
