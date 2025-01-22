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

# Install everything, I have no idea if we want --production
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
  yarn install --immutable


# ----------------------- builder -----------------

FROM base AS builder

# # add non root user
# RUN addgroup -S namviek && \
#   adduser -S -G namviek namviek

WORKDIR /app

# Argument to select the env file
ARG ENV_FILE=.env

# Copy the env file
COPY ${ENV_FILE} .env

COPY --from=deps /app/node_modules ./node_modules

RUN yarn generate2
RUN yarn build:fe

# ----------------------- runner -----------------
FROM node:22-alpine AS runner

# USER namviek
WORKDIR /app

COPY --from=builder /app/dist/apps/frontend/.next/standalone ./
COPY --from=builder /app/dist/apps/frontend/.next/static ./dist/apps/frontend/.next/static
COPY --from=builder /app/dist/apps/frontend/public ./apps/frontend/public

RUN chmod -R 0777  *

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

CMD HOSTNAME="0.0.0.0" node ./apps/frontend/server.js
