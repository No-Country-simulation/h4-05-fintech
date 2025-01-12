rm -rf prisma/migrations

npx prisma migrate reset --force --skip-seed

npx prisma migrate dev --name init --skip-seed

npx ts-node prisma/seed.ts

cross-env NODE_ENV=testing jest --config ./test/jest-e2e.json