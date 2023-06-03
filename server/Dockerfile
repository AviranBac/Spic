FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g ts-node
EXPOSE 8080
CMD [ "ts-node", "src/server/app.ts" ]
