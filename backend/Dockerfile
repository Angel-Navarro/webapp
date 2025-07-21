FROM node:18
WORKDIR /app
COPY package*.json ./
# Instalar netcat para el script de espera
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY . .
RUN chmod +x wait-for-db.sh
CMD ["sh", "-c", "./wait-for-db.sh && npm start"]

# backend/Dockerfile