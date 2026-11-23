FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 8080
ENV PORT=8080
CMD ["node", "server.js"]
