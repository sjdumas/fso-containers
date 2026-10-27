# Full Stack Open: Containers

This repository contains the work for the Full Stack Open [Containers](https://fullstackopen.com/en/part12) section of the course.

The focus of this part is on containerization, Docker, and deploying applications in a more production-like environment.

## Topics Covered

- Docker basics
- Building and running containers
- Docker Compose
- Volumes and persistence
- Networking between services
- Containerizing frontend and backend apps
- Multi-stage builds that run tests before building
- Nginx as a reverse proxy in front of the frontend and backend
- Development workflows with containers
- End-to-end tests against the containerized app in GitHub Actions

## Project Structure

```text
├── .github/workflows/
│   └── e2e-tests.yml       Builds and starts todo-app, then runs the Playwright tests on pushes to main
├── answers/                Terminal output for the exercises that ask for it
├── my-app/                 Dev and prod environments for my phonebook app (exercises 12.22 and 12.23)
│   ├── backend/            Express + MongoDB backend
│   ├── frontend/           React + Vite frontend
│   ├── docker-compose.yml
│   ├── docker-compose.dev.yml
│   ├── nginx.conf
│   └── nginx.dev.conf
├── todo-app/               The course's todo app
│   ├── todo-backend/       Express backend with MongoDB and Redis
│   ├── todo-frontend/      React + Vite frontend
│   ├── docker-compose.yml
│   ├── docker-compose.dev.yml
│   ├── nginx.conf
│   └── nginx.dev.conf
└── todo-tests/             Playwright end-to-end tests for todo-app
```

## Getting Started

1. Install Docker, including Docker Compose.
2. Clone this repository.
3. Go to `todo-app` or `my-app` and start one of the environments with Docker Compose:

```bash
# Development
docker compose -f docker-compose.dev.yml up

# Production
docker compose up --build
```

Then open <http://localhost:8080>. Run only one environment at a time, since they all use port 8080.

To stop an environment, press `Ctrl+C` or run `docker compose down` (add `-f docker-compose.dev.yml` for development). Adding `-v` also deletes the database volumes.

## How It Works

In both apps, Nginx is the only service with a port open to your machine (`8080`). It sends requests to `/api/` to the backend and everything else to the frontend. The databases are only reachable by the other containers.

- **Development** runs the Vite dev server and the backend with automatic restarts. The source folders are mounted into the containers, so code changes apply without rebuilding.
- **Production** builds the frontend into static files served by Nginx and runs the backend without development tools.

## todo-app

The todo app has a React frontend and an Express backend that stores todos in MongoDB and keeps a count of added todos in Redis.

| URL                                    | Description                                |
| -------------------------------------- | ------------------------------------------ |
| <http://localhost:8080>                | Todo app                                   |
| <http://localhost:8080/api/todos>      | Todos API (create, read, update, delete)   |
| <http://localhost:8080/api/statistics> | Number of todos added, stored in Redis     |

The production frontend image runs the frontend unit tests (Vitest) during the build, so `docker compose up --build` stops if a test fails.

The MongoDB username and password in the Compose files are the course's example values. They are fine for local learning but should not be used for a real deployment.

## Exercises 12.22 and 12.23: My Containerized Dev and Prod Environments

The `my-app` directory contains containerized development and production environments for my
Full Stack Open [phonebook](https://github.com/sjdumas/fso-phonebook) app.

To start it, from `my-app`:

- Development: `docker compose -f docker-compose.dev.yml up`
- Production: `docker compose up --build`

Then open <http://localhost:8080>.

## End-to-End Tests

The `todo-tests` folder contains Playwright tests that use the todo app in a browser at <http://localhost:8080>.

To run them locally, start the todo app first (production or development), then in a second terminal:

```bash
cd todo-tests
npm ci
npx playwright install chromium
npm run test:e2e
```

Use `npm run test:e2e:ui` to open the Playwright UI, or `npm run test:e2e:headed` to watch the browser.

### Continuous Integration

On every push to `main` or `master`, GitHub Actions (`.github/workflows/e2e-tests.yml`) builds the todo app images, starts the production environment, waits for it to respond, and runs the Playwright tests. If the tests fail, it uploads the Playwright report and prints the container logs.
