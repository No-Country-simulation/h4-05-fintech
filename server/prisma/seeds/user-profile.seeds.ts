import { UserProfile } from '@prisma/client';
import { adminUser, normalUser } from './user.seeds';

export const normalUserProfile: UserProfile = {
  id: '7ab559fc-68f4-4c76-9d3d-fe3ce7b9564b',
  userId: normalUser.id,
  name: 'Norman',
  lastname: 'Benutzer',
  image: 'image',
  surveyAnswered: false,
  financialProfileResults: null,
  itemsSaved: ['items', 'saved'],
  updatedAt: new Date(),
  notifications: false,
};

export const adminUserProfile: UserProfile = {
  id: 'aa7ce6e6-d066-4ab1-85bf-535a25803327',
  userId: adminUser.id,
  name: 'Norman',
  lastname: 'Benutzer',
  image: 'image',
  surveyAnswered: true,
  financialProfileResults: 'no financial profile defined',
  itemsSaved: ['items', 'saved'],
  updatedAt: new Date(),
  notifications: false,
};

export const userProfileSeeds = [normalUserProfile, adminUserProfile];
