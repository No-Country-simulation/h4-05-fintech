# DEPENDENCIES INSTALLATION
FROM node:22.12.0-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci 

# BUILD APPLICATION
FROM node:22.12.0-alpine AS builder

WORKDIR /app

COPY --from=deps /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig*.json ./
COPY src ./

RUN npm run build

RUN npm prune --production

# RUN APPLICATION
FROM node:22.12.0-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY prisma ./

CMD ["npm", "run", "start:prod"]