FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

WORKDIR /home/app

COPY . /home/app/
RUN npm install


CMD ["npm", "start"]


