# FROM alpine:latest
# RUN apk add nodejs npm

# FROM node:20-alpine


# COPY package*.json ./ 
# RUN npm ci --only=production


# COPY . .


# ENTRYPOINT ["node", "index"]

# CMD ["nodemon", "index"]

# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build

# RUN apt-get install -y nodejs
WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force
COPY . .

# RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:20-alpine AS runner
WORKDIR /app
# ENV NODE_ENV=production

# COPY package*.json ./


COPY --from=build /app ./

# USER node
CMD ["node", "index"]


# CMD ["nodemon", "index"]



