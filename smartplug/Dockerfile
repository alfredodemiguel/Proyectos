FROM ubuntu:20.04
RUN apt update
RUN apt -y install nodejs
RUN apt -y install npm
RUN mkdir app
RUN cd app
RUN mkdir system
WORKDIR  /app/system
COPY ./system/package*.json ./
RUN npm install
COPY ./system .
EXPOSE 3017
WORKDIR  /app/webUser
COPY ./websmartplug/package*.json ./
RUN npm install
COPY ./websmartplug .
EXPOSE 3000
CMD ["npm","start"]