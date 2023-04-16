FROM --platform=linux/x86_64 node:18-alpine3.17 as build

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build:prod

FROM --platform=linux/x86_64 nginx:1.23.3-alpine

COPY --from=build app/dist/sparrow-ui /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80
EXPOSE 443
