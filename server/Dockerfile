FROM node:22.12.0-alpine

WORKDIR /app

COPY prisma ./

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]

#docker build -t server-for-deploy-testing .
#docker run --rm -it -p 80:80 -e DATABASE_URL=postgresql://postgres:nlmvOW5Gnrj5Mlsw4TJ7@iupi-dbdev.cfiaaqokub1x.us-east-2.rds.amazonaws.com:5432/iupi-dbsample server-for-deploy-testing