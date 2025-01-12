rm -rf prisma/migrations

npx prisma migrate reset --force --skip-seed

npx prisma migrate dev --name init --create-only --skip-seed

npx prisma migrate deploy