rm -rf prisma/migrations

npx prisma migrate reset --force --skip-seed

npx prisma migrate dev --name init --skip-seed