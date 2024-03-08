# Loan Application RESTful API

This is a RESTful Loan Application API that uses NodeJS, Express, Joi (Validation), Jest and SuperTest (Testing) and TypeScript as the primary language.

### Prerequisites

* NodeJS (v16.17.0 and above)
* Git
* Visual Studio Code/Webstorm as IDE for Coding

### Installation

```
Clone the project
Execute "npm i / npm install" to get the node modules
```

## Environment Variables

Before running this project, you will need to add the following environment variables to your .env file

`PORT`

`HOST`

`PREFIX`

## Build 

As this is a TypeScript Express project, you need first to build using

```bash
npm run build
```

that will create a /dist directory containing the compiled js files.

## Deployment

To start/deploy this project, run the following command

```bash
npm run start
```

This will start the project with your specified `PORT` and `HOST` (default is `localhost:8000`)
## Continuous Deployment

For continuous deployment run

```bash
npm run dev
```

## Running Tests

To run tests, run the following command

```bash
npm run test
```

### Branches

* master
