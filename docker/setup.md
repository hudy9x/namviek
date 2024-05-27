# Docker Setup

### Pre-requisites

Before proceeding, make sure you have docker and docker-compose installed, the recommended versions for these two are:

- Docker version >= 25.0.0
- docker-compose >= 2.26.0

## Environment config

1. Clone the repository and go to the folder.
   `git clone git@github.com:hudy9x/namviek.git`
   `cd namviek`

2. Copy the .env.example file as .env.local and configure the environment variables.
   `cp .env.example .env.local`
   Now visit [here](https://github.com/hudy9x/namviek/blob/main/DOCUMENTS.md#configure-environment-variables) to configure environment variables in your .env.local

3. Add this value in the REDIS_HOST variable of your .env.local file
   `REDIS_HOST=host.docker.internal:6379`

4. Build the image.
   `docker-compose build`

5. Run the app.

```bash
  # Run in the foreground
  docker-compose up

  # Run in detached mode (recommended)
  docker-compose up -d
```
