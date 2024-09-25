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
# RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
# yarn install --immutable
RUN npm install --only=development --silent



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

RUN npm run generate2
# RUN yarn generate2

RUN npm run build:be
# RUN yarn build:be


FROM node:lts-alpine AS runner

# USER namviek
WORKDIR /app

COPY --from=builder /app/dist/packages/be-gateway ./
RUN npm install
# RUN chmod -R 0777  *


# # Set environment variables
# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
#
# # Expose the port the app runs on
EXPOSE 3000
#
# CMD HOSTNAME="0.0.0.0" node ./packages/ui-app/server.js
CMD ["node", "main.js"]
