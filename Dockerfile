FROM 172.19.30.186:8000/pub/node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN cnpm config set registry https://registry.npm.taobao.org
RUN cnpm config set @mediinfo-ued:registry http://172.19.30.181:8081/repository/npm-main
RUN cnpm set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

COPY . .
RUN cnpm install
RUN npm run build

FROM 172.19.30.186:8000/pub/nginx:latest
COPY --from=build-stage /app/dist/  /usr/share/nginx/html/
COPY --from=build-stage /app/dist/ /etc/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
