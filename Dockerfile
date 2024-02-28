FROM node:17-alpine

WORKDIR /receipt-processor

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "app.js" ]

EXPOSE 3000