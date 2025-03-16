# File: backend/Dockerfile
FROM node:16.14-alpine

WORKDIR /app-backend

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]