# Borra los archivos de migraciones
rm -rf prisma/migrations

# Resetea la base de datos
npx prisma migrate reset --force --skip-seed

# Ejecuta las migraciones a la base de datos
npx prisma migrate dev --name init --skip-seed

# Ingresa datos preliminares en las tablas 
npx ts-node prisma/seed.ts

# Inicia los tests end-to-end
cross-env NODE_ENV=testing jest --config ./test/jest-e2e.json