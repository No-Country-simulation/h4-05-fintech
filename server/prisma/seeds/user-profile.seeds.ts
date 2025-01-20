import { UserProfile } from '@prisma/client';
import { normalUser } from './user.seeds';

export const normalUserProfile: UserProfile = {
  id: '7ab559fc-68f4-4c76-9d3d-fe3ce7b9564b',
  userId: normalUser.id,
  name: 'Norman',
  lastname: 'Benutzer',
  image: 'image',
  financialProfile: 'no financial profile defined',
  itemsSaved: ['items', 'saved'],
  updatedAt: new Date(),
};

export const userProfileSeeds = [normalUserProfile];
