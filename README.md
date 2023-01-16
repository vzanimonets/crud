# CRUD api

## Table of Contents
- [Description](#Description)
- [Installation](#installation)
- [Usage](#usage)
- [Packages](#Packages)
- [Credits](#credits)
- [License](#license)

## Description

Implementation of simple CRUD API witch use in-memory database underneath.

1. Implemented endpoint `api/users`:
    - **GET** `api/users` is used to get all persons
        - Server answer: with `status code` **200** and all users records
    - **GET** `api/users/{userId}`
        - Server answer: `status code` **200** and corresponding record with `id === userId` if it exists
        - Server answer: `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server answer: `status code` **404** and corresponding message if record with `id === userId`
          doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        - Server answer: `status code` **201** and newly created record
        - Server answer: `status code` **400** and corresponding message if request `body` does not
          contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server answer: ` status code` **200** and updated record
        - Server answer: ` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        -Server answer:  ` status code` **404** and corresponding message if record with `id === userId`
          doesn't exist
    - **DELETE** `api/users/{userId}` is used to delete existing user from database
        - Server answer: `status code` **204** if the record is found and deleted
        - Server answer: `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server answer: `status code` **404** and corresponding message if record with `id === userId`
          doesn't exist
2. Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
3. Server's answer for requests to non-existing endpoints (e.g. `some-non/existing/resource`): `status code` **404** and corresponding human-friendly message)
4. Server's answer for errors on the server side that occur during the processing of a request: `status code` **500** and corresponding human-friendly message)
5. Value of `port` on which application is running stored in `.env` file

## Installation

1. Clone repository to your computer:

    ```bash
    git clone https://github.com/vzanimonets/crud.git
    ```

2. Install dependencies. In the folder of project you should type:

   ```bash
   npm install
   ```

## Packages
   
List of using packages:

    "cross-env": "^7.0.3",
    "dotenv": "^16.0.3",
    "ts-jest": "^29.0.3",
    "uuid": "^9.0.0"
    "@types/jest": "^29.2.5",
    "@types/mocha": "^10.0.1",
    "@types/node": "^18.11.18",
    "@types/supertest": "^2.0.12",
    "@types/uuid": "^9.0.0",
    "@typescript-eslint/eslint-plugin": "^5.47.1",
    "@typescript-eslint/parser": "^5.47.1",
    "eslint": "^8.30.0",
    "nodemon": "^2.0.20",
    "prettier": "^2.8.1",
    "supertest": "^6.3.3",
    "ts-loader": "^9.4.2",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.4",
    "webpack": "^5.75.0",
    "webpack-cli": "^5.0.1"

## Usage
Fist you should rename file `.env_example` to `.env`


### Start application in development mode:

   ```bash
   npm npm run start:dev
   ```

 This mode automatically run the tests before application is start.

### Start application in production mode:

   ```bash
   npm npm run start:prod
   ```

This mode creat bundle file `dist/bundle.js`

### Start application in  multi mode:

   ```bash
   npm npm run start:multi
   ```

Implementation of horizontal scaling for application that starts multiple instances of the application using the Node.js Cluster API.

### Start tests:

   ```bash
   npm npm run test
   ```

Running three tests scenario.

## Credits

![avatar](https://avatars.githubusercontent.com/vzanimonets?size=40)  [Viktar Zanimonets](https://github.com/vzanimonets)

## License

[MIT](https://choosealicense.com/licenses/mit/)
