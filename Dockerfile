FROM node:18-alpine

RUN mkdir -p /app_fe

WORKDIR /app_fe

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]