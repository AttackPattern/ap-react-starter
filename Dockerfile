FROM node:7
MAINTAINER Attack Pattern <hello@attackpattern.com>

ENV SOURCE /src
ENV NODE_PATH=$SOURCE
ENV ASSETS_PATH=/public
ENV APP_PORT=3000

EXPOSE $APP_PORT

RUN npm install -g webpack --silent
WORKDIR $SOURCE
ADD . $SOURCE

RUN npm install

CMD npm start
