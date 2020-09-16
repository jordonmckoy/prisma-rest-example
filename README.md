# Employee review management app

## How to run

### Start the services

To provision a mysql db and server application run:

`$ docker-compose up --build` 

### Seed the database

In a new terminal run the following command to populate the database with some
default values:

`$ cd backend && npm run seed`

### Start the client

Run the following commands to start the client:

`$ cd ../frontend && npm install && REACT_APP_API_URL=http://localhost:8000 npm run start`

### Login

You can login using the following credentials:

`jmckoy / password`

## Architecture

### Backend

- MySQL db
- Express.js
- Typescript
- Prisma

### Frontend

Tech Stack
- React (create-react-app)
- Typescript
- Material UI
- Redux (Saga)

## Improvements needed

### Architecture

- Use a process manager for running the backed

### Backend

- Add tests
- Proper authentication and authorization system
- Complete CRUD operations for reviews

### Frontend

- Add tests
- Absolute paths on imports
- Pass user login details securely to server
- Integrate all backend endpoints