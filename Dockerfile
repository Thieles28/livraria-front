FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:1.23-alpine

COPY --from=build /app/dist/livraria-front /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
