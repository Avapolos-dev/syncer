FROM node:14-alpine

WORKDIR /app
COPY package*.json .

RUN npm i
# RUN npm ci

COPY . .

EXPOSE 3000