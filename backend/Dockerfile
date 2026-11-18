# tfjs-node butuh glibc, jadi gunakan image Debian (bukan Alpine)
FROM node:18-bullseye-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
