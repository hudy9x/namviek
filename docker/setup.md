# Docker Setup

### Pre-requisites

Before proceeding, make sure you have docker and docker-compose installed, the recommended versions for these two are:

- Docker version >= 25.0.0
- docker-compose >= 2.26.0

## Environment config

1. Clone the repository and go to the folder.

   ```bash
   git clone git@github.com:hudy9x/namviek.git
   cd namviek
   ```

2. Copy the .env.example file as .env.local and configure the environment variables.

   ```bash
   cp .env.example .env.local
   ```

3. Build the image.

   ```bash
   docker compose build
   ```

4. Run the app.

   ```bash
   # Option 1 - Run in detached mode (recommended) 
   docker compose up -d

   # Option 2 - Run in the foreground
   docker compose up
   ```
