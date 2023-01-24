FROM node:14.19.0

EXPOSE 3000

WORKDIR /app
COPY . /app

RUN yarn

ENTRYPOINT ["yarn", "start"]