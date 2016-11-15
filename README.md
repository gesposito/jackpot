# Jackpot

Customized version of [express-example](https://github.com/sequelize/express-example) showing a sample application (data is from [superenalotto](https://www.sisal.it/superenalotto/estrazioni)).

## Requirements
* You'll need MySQL installed on your machine (i.e. with `brew install mysql` or Docker)
* You won't need `yarn`, simply use `npm run` instead, but `yarn` is preferred

## Config
* Step 0
```shell
cp config/config.mock.json config/config.json
```
Create your config file from the mocked one and customize it with your credentials

## Feed data

* Step 1
```shell
yarn feed
```

Will download all the `Games` data

## Schema Migrations

* Step 2
```shell
yarn db:migrate
```

Will run the migrations. If you run the app for the first time, this will be taken care by `sequelize.sync()` in `bin/www`.

```shell
yarn db:migrate:undo:all
```

Will undo the migrations (if needed)

## Data seeding

* Step 3
```shell
yarn seed:all
```

Will seed data in your DB

```shell
yarn seed:undo
```

Will undo the seeding (if needed)

# Run

* Step 4 (Profit)
```shell
yarn start
```
