ARG TAG=18.12.1-alpine

# BUILD FOR LOCAL DEVELOPMENT ------------------------------------------------ #
FROM node:$TAG As development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# BUILD FOR PRODUCTION ------------------------------------------------------- #
FROM node:$TAG As build

WORKDIR /app

COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .

RUN npm run build

ENV NODE_ENV production

RUN npm prune --omit=dev

# PRODUCTION ----------------------------------------------------------------- #
FROM node:$TAG As production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
ENV PORT 3000

CMD npm run start:prod