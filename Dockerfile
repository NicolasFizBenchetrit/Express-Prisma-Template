FROM node:18.16-alpine as depsbuild

WORKDIR /app

COPY ["./package*.json", "./"]

RUN npm install


FROM node:18.16-alpine as builder

WORKDIR /app

COPY --from=depsbuild /app/node_modules ./node_modules

COPY . .

RUN npm run build


FROM node:18.16-alpine as deps

WORKDIR /app

COPY ["./package*.json", "./"]

COPY prisma ./prisma/

RUN npm install --omit=dev

RUN npx prisma generate

FROM node:18.16-alpine as runner

WORKDIR /home/node/app

RUN apk update && apk add tzdata

ENV TZ=Europe/Madrid

COPY --from=deps /app/node_modules ./node_modules

COPY --from=builder /app/dist/ .

COPY .env ./

EXPOSE 4000

CMD [ "node", "src/server.js" ]