FROM node:24

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npx", "nodemon", "index.js"]
