# Etapa 1: build do Angular
FROM node:18-alpine as build

WORKDIR /app

# Copia todos os arquivos para dentro do container
COPY . .

# Instala dependências
RUN npm install

# Build de produção do Angular
RUN npm run build --prod

# Etapa 2: servidor nginx para servir o build
FROM nginx:1.23-alpine

# Copia os arquivos buildados do Angular para a pasta padrão do nginx
COPY --from=build /app/dist/livraria-front /usr/share/nginx/html

# Copia o arquivo de configuração do nginx (se tiver)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
