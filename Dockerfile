# vue build stage
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY . /app
RUN npm install -g @angular/cli
RUN npm install --force
RUN ng build

# production stage
FROM nginx:stable-alpine AS production-stage
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/juniorenfirma-messe-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
