# IDL Management Toolkit Back-end

## Environment Variables
``` bash
DB_HOST=[host]
DB_USER=[user]
DB_PASSWORD=[password]
DB_DATABASE=[db_name]
```

## Import data to local database

From the same directory that you did the export, import the data into your local DB by running:

`mysql -u root -p db_pmo < db_pmo.sql`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```