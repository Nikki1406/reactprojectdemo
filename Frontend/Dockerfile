FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM httpd:2.4-alpine
COPY --from=build /app/dist /usr/local/apache2/htdocs/
COPY .htaccess /usr/local/apache2/htdocs/.htaccess
RUN sed -i \
    -e 's/#LoadModule rewrite_module/LoadModule rewrite_module/' \
    -e 's/AllowOverride None/AllowOverride All/g' \
    /usr/local/apache2/conf/httpd.conf
EXPOSE 80