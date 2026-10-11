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
- Development workflows with containers

## Getting Started

1. Install Docker on your machine.
2. Clone this repository.
3. Go to `todo-app` or `my-app` and start one of the environments with Docker Compose:

```bash
# Development
docker compose -f docker-compose.dev.yml up

# Production
docker compose up --build
```

Then open http://localhost:8080. Run only one environment at a time, since they all use port 8080.

## Exercises 12.22 and 12.23: My Containerized Dev and Prod Environments

The `my-app` directory contains containerized development and production environments for my
Full Stack Open [phonebook](https://github.com/sjdumas/fso-phonebook) app.

To start it, from `my-app`:

- Development: `docker compose -f docker-compose.dev.yml up`
- Production: `docker compose up --build`

Then open http://localhost:8080.
