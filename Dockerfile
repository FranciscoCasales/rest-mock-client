FROM node:lts-slim

VOLUME [ "/vol/node/moock/client" ]

WORKDIR /vol/node/moock/client

COPY dist/. /vol/node/moock/client/
COPY package.json /vol/node/moock/client
COPY package-lock.json /vol/node/moock/client
COPY src/custom-mocks/mock.config.json /vol/node/moock/client/custom-mocks

RUN npm i --omit dev

EXPOSE 9000

CMD [ "node", "index.mjs" ]