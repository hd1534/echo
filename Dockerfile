# This file is a template, and might need editing before it works on your project.
FROM node:8.11
WORKDIR /home/echo
EXPOSE 80

ARG NODE_ENV = production
ENV NODE_ENV $NODE_ENV

COPY package.json /home/echo
RUN npm install

COPY . /home/echo

# replace this with your application's default port
EXPOSE 8888
CMD [ "npm", "start" ]