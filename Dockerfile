FROM node:lts-slim

VOLUME [ "/vol/node/mock/client" ]

WORKDIR /vol/node/mock/client

COPY dist/. /vol/node/mock/client/
COPY package.json /vol/node/mock/client
COPY package-lock.json /vol/node/mock/client
COPY src/custom-mocks/mock.config.json /vol/node/mock/client/custom-mocks

RUN npm i --omit dev

EXPOSE 9000

CMD [ "node", "index.mjs" ]
