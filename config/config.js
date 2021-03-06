require("dotenv").config();
module.exports = {
  "development": {
    "username": process.env.DEV_DB_USER,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_NAME,
    "host": process.env.DEV_DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.EV_DB_USER,
    "password": process.env.EV_DB_PASSWORD,
    "database": process.env.EV_DB_NAME,
    "host": process.env.DEV_DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.EV_DB_USER,
    "password": process.env.EV_DB_PASSWORD,
    "database": process.env.EV_DB_NAME,
    "host": process.env.DEV_DB_HOST,
    "dialect": "postgres"
  }
}