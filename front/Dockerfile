FROM node:8.1.4

RUN mkdir -p /var/app
WORKDIR /var/app

COPY package.json .
RUN npm install
COPY . .
