# This file is a template, and might need editing before it works on your project.
FROM node:12
EXPOSE 80

ENV DIR "/home/echo"
ENV NODE_ENV "production"

RUN echo Asis/Seoul > /etc/timezone

COPY ./ $DIR

WORKDIR $DIR/echo
RUN npm install


RUN chmod a+x $DIR/.docker-entrypoint.sh

ENTRYPOINT ["$DIR/.docker-entrypoint.sh"]
CMD [ "npm", "start" ]