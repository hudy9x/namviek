## Project Overview

Namviek is an open source project management tool that helps you reduce the operational cost by 90%. 

It is a web application that is built with:
- NextJS
- TailwindCSS
- ExpressJS
- MongoDB
- Redis

## Code Structure

The project is monorepo project with multiple apps and packages. It's using NX to manage the project.

```
namviek
├── apps
│   ├── backend
│   ├── frontend
├── docker
├── package.json
├── packages
│   ├── auth-client
│   ├── core
│   ├── database
│   ├── event-bus
│   ├── task-runner
│   └── ui-components
├── scripts
```
### Directory Overview

#### Apps
The `apps` directory contains the main applications of our project:

| Application | Description |
| :- | :- |
| `frontend` | Next.js web application|
| `backend` | Express.js server application|

#### Docker
The `docker` directory contains containerization configurations:
- Dockerfile for each service
- Docker Compose configurations
- Environment-specific docker settings
- Container orchestration files

#### Scripts
The `scripts` directory contains utility scripts:
- AWS Lightsail deployment scripts
- Database backup and restore utilities (WIP)
- Environment setup scripts (WIP)
- CI/CD helper scripts (WIP)

#### Packages
The `packages` directory contains shared libraries and modules that can be used across different applications:

| Package | Purpose |
| :- | :- |
| `auth-client` | Authentication and authorization |
| `core` | Core business logic and utilities:<br/>- Common interfaces<br/>- Shared constants<br/>- Helper functions<br/>- Base configurations<br/>- Common types |
| `database` | Prisma schema, migration and repository |
| `event-bus` | Event handling system |
| `task-runner` | Scheduled tasks |
| `ui-components` | Reusable UI component library |

### Project Overview

- User have to create their own organization before they can start using the app
- Organization can have multiple projects
- Project can have multiple tasks
- Project can have multiple members
- Project can have multiple views: board, calendar, list, goal, dashboard, team, grid.

## Backend 

- Router is put in `apps/backend/src/routes`
- Each folder in `src/routes` includes controllers. When define a new controller, please follow the `apps/backend/src/routes/example/index.ts` file.
- Business logic is put in `apps/backend/src/services`
- Models are put in `packages/database/src/lib` 
- Database schema is put in `packages/database/src/prisma/schema.prisma`

## Frontend

- Routes should only contain the route definition, and the route logic should be put in `apps/frontend/src/_features` folder.
- Every component should be imported from `@ui-components` package.

