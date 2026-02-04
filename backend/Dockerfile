FROM node:20-alpine

# Install redis
RUN apk add --no-cache redis

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

# Start Redis + Node
CMD redis-server --daemonize yes && npm run start2
