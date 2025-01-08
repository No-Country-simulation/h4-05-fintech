# DEPENDENCIES INSTALLATION
FROM node:22-alpine3.20 AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci 

# BUILD APPLICATION
FROM node:22-alpine3.20 AS builder

WORKDIR /app

COPY --from=deps /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig*.json ./
COPY src ./

RUN npm run build 

RUN npm prune --production

# RUN APPLICATION
FROM node:22-alpine3.20 AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start:prod"]