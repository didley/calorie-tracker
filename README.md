# calorie-tracker
The frontend is built with React with react-query for server state management, the backend is built with node, express 
and mongoose with passportJS for authentication. It's still a work in progress, currently the API isn't enabled and it 
can only be accessed as a guest where data is stored and managed in local storage.

## Demo
![Diary page demo](demo/diary.gif) &nbsp;&nbsp;&nbsp;&nbsp; ![Adding food demo](demo/addFood.gif)

## Installing

```console
$ cd calorie-tracker
$ yarn install
// Remove .example and modify environment variables in /api/.env.example & /client_web/.env.example
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
