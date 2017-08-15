FROM node:8.1.4 as builder

RUN mkdir -p /var/app
WORKDIR /var/app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build


FROM nginx:1.13.3

WORKDIR /etc/nginx
COPY --from=builder /var/app/dist/ /etc/nginx/dist
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]