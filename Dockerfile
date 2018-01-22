FROM node:8
MAINTAINER Attack Pattern <hello@attackpattern.com>

ENV SOURCE /src
ENV NODE_PATH=$SOURCE
ENV ASSETS_PATH=/public
ENV APP_PORT=3000

EXPOSE $APP_PORT

RUN yarn global add webpack

COPY ./package.json $SOURCE/package.json
WORKDIR $SOURCE

RUN yarn
ADD . $SOURCE
RUN ls -al ./node_modules | grep babel

CMD npm run prod
