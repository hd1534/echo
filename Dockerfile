# This file is a template, and might need editing before it works on your project.

ARG DIR = /home/echo
ARG NODE_ENV = production
ARG TIMEZONE = Asis/Seoul

FROM node:8.11
WORKDIR $DIR
EXPOSE 80

RUN echo Asis/Seoul > /etc/timezone

ENV NODE_ENV $NODE_ENV

COPY package.json $DIR
RUN npm install

COPY ./ $DIR


RUN chmod a+x /home/echo/app/docker-entrypoint.sh

ENTRYPOINT ["/home/echo/app/docker-entrypoint.sh"]
CMD [ "npm", "start" ]