# ----------------------- base -----------------
FROM node:22-alpine AS base

USER root
# Update image
RUN apk update && apk upgrade --available && apk add --no-cache g++ make python3

COPY . /app
WORKDIR /app

# Add NX
RUN yarn global add nx@latest 

# ----------------------- dependencies -----------------
FROM base AS deps

RUN npm install --only=development

# ------------------------ builder ---------------
FROM base AS builder

# add non root user
# RUN addgroup -S namviek && \
#   adduser -S -G namviek namviek

WORKDIR /app

# Argument to select the env file
ARG ENV_FILE=.env
# Copy the env file
COPY ${ENV_FILE} .env

COPY --from=deps /app/node_modules ./node_modules

RUN yarn generate2
RUN yarn build:be

# ------------------------ runner ---------------------
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist/apps/backend ./
COPY ./packages/database/src/prisma/schema.prisma .
COPY ./yarn.lock .

# Only need MONGODB_URL in .env file
COPY .env .env

# RUN yarn install --frozen-lockfile
RUN yarn install


# ---------------- TEST ------------
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# --------------------------------


ENV PORT=3000

EXPOSE 3000


# CMD HOSTNAME="0.0.0.0" node main.js
CMD ["node", "main.js"]
# CMD ["node", "test.js"]

