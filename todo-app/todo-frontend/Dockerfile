# Stage 1: install dependencies and run the tests
FROM node:24 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm test

# Stage 2: build the app, continuing from the tested stage
FROM test-stage AS build-stage

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm run build

# Stage 3: serve the built files
FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
