# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Instala um servidor HTTP simples para rodar a aplicação
RUN npm install -g http-server

# Expor a porta onde a aplicação rodará
EXPOSE 8080

# Comando para rodar o servidor HTTP
CMD ["http-server", "-p", "8080"]