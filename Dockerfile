FROM node:18.15.0

LABEL author="Andrew Makarevich" email="andreimakarevich2001@gmail.com"

WORKDIR /news-page-server

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

ENTRYPOINT ["bash", "start.sh"]