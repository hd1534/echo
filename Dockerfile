# This file is a template, and might need editing before it works on your project.
FROM node:12
EXPOSE 80

ENV NODE_ENV "production"

RUN echo Asis/Seoul > /etc/timezone

COPY ./ /home/echo

WORKDIR /home/echo/echo
RUN npm install


RUN chmod a+x /home/echo/docker-entrypoint.sh

ENTRYPOINT ["/home/echo/docker-entrypoint.sh"]
CMD [ "npm", "start" ]