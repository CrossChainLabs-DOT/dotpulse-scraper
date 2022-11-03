FROM node:alpine

RUN apk add --update git

WORKDIR '/app'

COPY package.json .

RUN npm install

COPY . .
COPY .env.sample .env

CMD ["npm", "run", "start"]