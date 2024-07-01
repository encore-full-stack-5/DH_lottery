FROM nginx:latest
COPY ./dist /react
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80