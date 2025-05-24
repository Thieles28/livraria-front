# 📚 Livraria - Frontend

Este é o frontend da aplicação **Livraria**, desenvolvido com **Angular** e servido via **Nginx** em um container Docker.

---

## ✅ Pré-requisitos

- Docker
- Docker Compose (caso deseje integrar com backend e banco)

---

## 🚀 Subindo a aplicação

Execute o seguinte comando para subir o frontend:

```bash
docker-compose up --build
```

Após isso, a aplicação estará disponível em:

```
http://localhost:4200
```

> ⚠️ Certifique-se de que o backend esteja rodando e acessível em `http://localhost:8080`.

---

## 🧱 Estrutura do Docker

### `Dockerfile`

A imagem do frontend é construída em duas etapas:

1. **Build Angular (etapa 1):**

- Utiliza a imagem `node:18-alpine`
- Instala as dependências (`npm install`)
- Gera o build de produção (`npm run build --prod`)

2. **Servidor Nginx (etapa 2):**

- Utiliza a imagem `nginx:1.23-alpine`
- Copia os arquivos do build Angular para a pasta padrão do Nginx
- Utiliza um arquivo de configuração customizado `nginx.conf`

---

## ⚙️ Configuração do Nginx

O arquivo `nginx.conf` já está presente na raiz do projeto e está corretamente configurado para rotear as URLs para `index.html`, garantindo que a aplicação Angular funcione corretamente com rotas.

Conteúdo do `nginx.conf`:

```nginx
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

## 🔗 Integração com Backend

O frontend consome a API REST exposta pelo backend localizado em:

```
http://localhost:8080
```

Certifique-se de que o backend esteja disponível.
