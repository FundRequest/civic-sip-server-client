FROM node:8-alpine

WORKDIR /app
COPY . .

RUN npm install --production

EXPOSE 3001

ENTRYPOINT ["node", "index.js"]
