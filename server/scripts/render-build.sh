# Instalar dependencias
npm ci 

# Generar tipos desde el esquema de prisma
npx prisma generate 

# Construir aplicación
npm run build 

# Eliminar dependencias de desarrollo
npm prune --production