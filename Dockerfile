# This file is a template, and might need editing before it works on your project.

ENV DIR "/home/echo"
ENV NODE_ENV "production"
ENV TIMEZONE "Asis/Seoul"

FROM node:8.11
WORKDIR $DIR
EXPOSE 80

RUN echo Asis/Seoul > /etc/timezone

COPY ./ $DIR

WORKDIR $DIR/echo
RUN npm install


RUN chmod a+x /home/echo/app/docker-entrypoint.sh

ENTRYPOINT ["/home/echo/app/docker-entrypoint.sh"]
CMD [ "npm", "start" ]