# Home Library Service

Simple home music library service with Node.js.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running](#running)
- [API](#api)

## General info

This project is simple simple home music library service application.

## Technologies

Project is created with:

- Node.js 18 LTS
- NestJS

## Prerequisites

To run this project please make sure to have `Git` and `Docker` installed.

## Setup

To setup the project, please follow these steps:

1. clone this repo to your machine using `git clone`

2. open project folder

3. go to develop branch using `git checkout feature-2`

4. copy `.env.example` file in root of the project and name new file `.env`

## Running

```
npm run docker:build
```

## Scanning

```
npm run docker:scan
```

## API

After starting the app on port (4000 as default) you can use project's OpenAPI documentation in your browser here: http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
You can also connect to database using settings and credentials in .env file.
