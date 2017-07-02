FROM node:latest

WORKDIR /tmp
ADD package.json /tmp/package.json
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
RUN mkdir -p /var/apps/web
RUN cp -a /tmp/node_modules /var/apps/web

WORKDIR /var/apps/web
ADD . /var/apps/web
RUN npm run build