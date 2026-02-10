FROM alpine:latest
RUN apk add nodejs npm

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY . .

RUN npm install

# ENTRYPOINT ["node", "index.js"]

CMD ["nodemon", "index"]



