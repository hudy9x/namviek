# ----------------------- base -----------------
FROM node:lts-alpine AS base

USER root
# Update image
RUN apk update && apk upgrade --available && apk add --no-cache g++ make python3

COPY . /app
WORKDIR /app

# Add NX
RUN yarn global add nx@latest 

# ----------------------- dependencies -----------------
FROM base AS deps

RUN npm install --only=development --silent

# ------------------------ builder ---------------
FROM base AS builder

# add non root user
RUN addgroup -S namviek && \
  adduser -S -G namviek namviek

WORKDIR /app

# Copy the env file
COPY .env .env

COPY --from=deps /app/node_modules ./node_modules

RUN npm run generate2
RUN npm run build:be

# ------------------------ runner ---------------------
FROM node:lts-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist/packages/be-gateway ./
COPY ./packages/shared-models/src/prisma/schema.prisma .

# Only need MONGODB_URL in .env file
COPY .env .env

RUN npm install --only=production --silent 
RUN npx prisma generate --schema=./schema.prisma


ENV PORT=3000

EXPOSE 3000


CMD HOSTNAME="0.0.0.0" node main.js
# CMD ["node", "main.js"]
