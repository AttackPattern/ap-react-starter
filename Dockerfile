FROM node:6-alpine
MAINTAINER Attack Pattern <hello@attackpattern.com>

ENV SOURCE /src
ENV NODE_PATH=$SOURCE
ENV ASSETS_PATH=/public
ENV APP_PORT=8082

EXPOSE $APP_PORT


WORKDIR $SOURCE
ADD . $SOURCE

RUN apk update && apk upgrade \
    && apk add bash-completion \
    && bash ${SOURCE}/script/install.sh

CMD npm start
