# lol LINKS - simple crud application

#### Simple crud app that allows you to store "links" in MongoDB

## ![project main image](https://raw.githubusercontent.com/jethrinfox/links-crud/master/links-crud.jpg)

## Table of contents

-   [Introduction](#Introduction)
-   [Technologies](#Technologies)
-   [Setup](#Setup)
-   [Functionality](#Functionality)

### Introduction

This is a crud application made with love by me back when I was learning JS basics. I use handlebars engine for this, if I rebuild this in the near future I'll probably go for a ReactJS frontend (because that's what I'm using right now) and more functionality.
That being said I like handlebar templating but nowadays I wouldn't use it.

## Technologies

-   NodeJS
-   Express
-   Handlebars
-   Bootstrap v4
-   MongoDB (mongoose)
-   Passport (local auth strategy)

## Setup

First I'm gonna assume that you have some instance of MongoDB running.
If that's not the case you can create one for free in [Atlas](https://www.mongodb.com/cloud/atlas).

##### Clone the repo

`git clone https://github.com/jethrinfox/links-crud`

`cd links-crud`

##### Install dependecies

`npm install`

##### Run it with or without nodemon

`npm start`

or

`npm run dev`

## Functionality

It's a simple project but it has local authentication that uses MongoDB to store user info and session data.

-   Signup using a name, email, and password(more than 6 digits)
-   Log in using your email and password
-   Create, Read, Update, and Delete using the handlebars frontend
-   Store a "link" name, URL, and description (not very useful :persevere: but it show the functionality && you can easily tweak it)
-   Flash notification messages
