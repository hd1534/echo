# This file is a template, and might need editing before it works on your project.
FROM node:12
WORKDIR $DIR
EXPOSE 80

ENV DIR "/home/echo"
ENV NODE_ENV "production"

RUN echo Asis/Seoul > /etc/timezone

COPY ./ $DIR

WORKDIR $DIR/echo
RUN npm install


RUN chmod a+x /home/echo/app/docker-entrypoint.sh

ENTRYPOINT ["/home/echo/app/docker-entrypoint.sh"]
CMD [ "npm", "start" ]