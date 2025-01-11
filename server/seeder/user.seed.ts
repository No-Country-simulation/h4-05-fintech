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

export const userSeeds = [unverifiedUser];
