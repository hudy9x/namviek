FROM node:lts-alpine AS base

USER root
# Update image
RUN apk update && apk upgrade --available && apk add --no-cache g++ make python3

COPY . /app
WORKDIR /app

# Add NX
RUN yarn global add nx@latest 





#############################
# Install NPM packages so we can ditch caches
FROM base AS deps

# Install everything, I have no idea if we want --production
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
  yarn install --immutable





#############################
# Runner without caches
FROM base AS builder

# add non root user
RUN addgroup -S namviek && \
  adduser -S -G namviek namviek

WORKDIR /app

# Argument to select the env file
ARG ENV_FILE=.env

# Copy the env file
COPY ${ENV_FILE} .env

#grab previously installed modules without caches. 
COPY --from=deps /app/node_modules ./node_modules

RUN yarn generate2

RUN yarn build:fe



FROM node:lts-alpine AS runner

# USER namviek
WORKDIR /app

COPY --from=builder /app/dist/packages/ui-app/.next/standalone ./
COPY --from=builder /app/dist/packages/ui-app/.next/static ./dist/packages/ui-app/.next/static
COPY --from=builder /app/dist/packages/ui-app/public ./packages/ui-app/public
RUN chmod -R 0777  *
# COPY --from=builder /app/dist/packages/ui-app/.next/static ./.next/static


# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

CMD HOSTNAME="0.0.0.0" node ./packages/ui-app/server.js
# CMD ["node", "./packages/ui-app/server.js"]
