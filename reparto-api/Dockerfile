FROM node:14.15-slim
RUN mkdir -p /usr/app/src
WORKDIR /usr/app
COPY package.json /usr/app/
COPY .env.docker /usr/app/.env
RUN npm install
COPY src/ /usr/app/src
EXPOSE 3000
CMD [ "npm", "start"]
