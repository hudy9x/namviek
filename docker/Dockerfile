FROM node:lts-alpine as base

USER root
# Update image
RUN apk update && apk upgrade --available && apk add --no-cache g++ make python3

COPY . /app
WORKDIR /app

# Add NX
RUN yarn global add nx@latest 

#############################
# Install NPM packages so we can ditch caches
FROM base as builder

# Install everything, I have no idea if we want --production
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
  yarn install --immutable

#############################
# Runner without caches
FROM base as runner

# add non root user
RUN addgroup -S namviek && \
  adduser -S -G namviek namviek

WORKDIR /app

# Argument to select the env file
ARG ENV_FILE=.env.local

# Copy the env file
COPY ${ENV_FILE} .env

#grab previously installed modules without caches. 
COPY --from=builder /app/node_modules ./node_modules
RUN chown -R namviek:namviek /app 

USER namviek

EXPOSE 3000

# Permissions for be-entrypoint
RUN chmod +x ./docker/be-entrypoint.sh

# Permission for fe-entrypoint
RUN chmod +x ./docker/fe-entrypoint.sh
