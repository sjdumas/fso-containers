# Stage 1: build the app
FROM node:24 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# Stage 2: serve the built files
FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
