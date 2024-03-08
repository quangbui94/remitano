FROM node:lts as builder

WORKDIR /app

ARG BACKEND_URL

ENV REACT_APP_BACKEND_URL $BACKEND_URL

COPY ./package.json /app/package.json

RUN yarn

COPY . .

RUN yarn build:dev

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]