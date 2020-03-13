FROM node:lts-alpine as node

ARG ENV=prod

ENV ENV ${ENV}

WORKDIR /app
COPY ./ /app/

RUN npm install npm@latest -g
RUN npm install

RUN npm run build -- --mode ${ENV}

RUN mv /app/dist/* /app/dist/

# Serve app, based on Nginx, to have only the compiled app ready for production with Nginx
FROM nginx:1.15.8

# Install nginx extras
RUN apt-get update
RUN apt-get install -y nginx-extras

COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx/conf.d/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/sites-available/default /etc/nginx/sites-available/default

# << BUILD INFO >>
# docker build --build-arg ENV=<development | production> -t <IMAGE_NAME>/<APP_NAME>:<TAG> .
# BUILD DEV IMAGE: docker build --build-arg ENV=development -t myimage/todo:dev-1 .
# BUILD PROD IMAGE: docker build --build-arg ENV=production -t myimage/todo:prod-1 .

# << RUN IMAGE >>
# docker run -d -p 8080:80 <IMAGE_NAME>/<APP_NAME>:<TAG>
# docker run -d -p 8080:80 myimage/todo:tag-1
