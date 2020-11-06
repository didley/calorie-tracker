# calorie-tracker


## ABOUT
---
### Styling
Styling is provided by TailwindCSS, init document is found under /src/tailwind.css


<br />

## SETUP
---
### Installing
```shell
$ cd calorie-tracker
$ npm i
```
### Running
```shell
$ cd calorie-tracker
$ npm start
``` 

<br />


## TODO
---

### 👨‍💻  Working On
  - [ ] note routes
  - [ ] implement admin management 
  - [ ] add propTypes to components

### 🌚  Done
  - [x] user creation
  - [x] auth
  - [x] password hashing
  - [x] finish food routes
  - [x] start backend
  - [x] run prebuild script needs to be run separate from start:react, move to single script (start: client, start) 
  - [x] yesterday/tomorrow on sides of today, onClick to change to that day
  - [x] center diary
  - [x] date selector in diary

### 🐛  Bugs
  - [ ] diary date errors on change if no diary info

### 🚀  Features
  - [ ] google api for food verification


<br/>


## NOTES
---
### routes
- /diary
- /diary?date=2020-09-04
  - /diary/add?q=foods
  - /diary/add?q=recent
  - /diary/add?q=myFoods
- /weight
- /profile
- /help
- /about