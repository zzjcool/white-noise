# build stage
FROM node:14.17.6 as builder
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm config set registry https://registry.npm.taobao.org \
    && npm install \
    && npm run build

# production stage
FROM nginx:1.19-alpine as prod
COPY --from=builder /usr/src/app/dist/spa /usr/share/nginx/html
