# calorie-tracker
This is the first larger project I’ve created, I’d love any feedback or input. It started as what I thought would be a small weekend project and turned into something a bit bigger! 

The frontend is using React with react-query for the server state management, the backend is built with node, express and mongoose with passportJS for authentication. It's still a work in progress and there's still some work to do before it can be deployed.

## Demo
![Diary page demo](demo/diary.gif) &nbsp;&nbsp;&nbsp;&nbsp; ![Adding food demo](demo/addFood.gif)

## Installing

```console
$ cd calorie-tracker
$ yarn install
// replace remove .example form /api/.env.example $ /client_web/.env.example and fill in
```
## Running

```console
$ cd calorie-tracker

// API & Client
$ yarn start

// Client only
$ yarn start:client

// API only
$ yarn start:api

``` 