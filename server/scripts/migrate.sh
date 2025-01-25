# Borra los archivos de migraciones
rm -rf prisma/migrations

# Resetea la base de datos
npx prisma migrate reset --force --skip-seed

# Ejecuta las migraciones a la base de datos
npx prisma migrate dev --name init --skip-seed