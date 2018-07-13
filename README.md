# compose-bitso-statistics

## Getting Started

### Prerequisites

- docker
- docker-compose
- nodejs (only-development)
- npm (only-development)
- python (only-development)

## Running

You can run the whole project using docker-compose, however you can run each project individually accesing inside the projects folder and follow the readme instructions.

## Docker

``` #!/bin/bash
- cd path/project
- docker-compose up -d
```

[PostgreSQL] - Go to http://localhost:5432
[Dashboard] - Go to http://localhost:5000
[API] - Go to http://localhost:3000

## Built With

Here is a run-down of the core technologies used in this project.

1. [API - ExpressJS](https://www.npmjs.com/package/node-typescript-koa-rest) - Boilerplate for API REST using NodeJS and KOA2, typescript. Logging and JWT as middlewares. TypeORM with class-validator, SQL CRUD.

2. [BACKUP - Python](https://apscheduler.readthedocs.io/en/latest/) - Is a Python library that lets you schedule your Python code to be executed later, either just once or periodically.

3. [DASHBOARD - REACT](https://reactjs.org/) - A very popular JavaScript DOM rendering framework for building scalable web applications using a component-based architecture.

4. [DATABASE - POSTGRESQL](https://www.postgresql.org/) - The world's most advanced open source database

5. [Docker](https://www.docker.com/) - Docker is an open platform for developers and sysadmins to build, ship, and run distributed applications, whether on laptops, data center VMs, or the cloud.