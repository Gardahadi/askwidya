# Ask Widya

A simple Facebook Messenger Chatbot with very basic functionality built using Typescript with TypeORM.

## Overview

### Architecture

![](https://i.imgur.com/lqNMr0V.png)

### Bot Features

- Basic conversation starter
- Birthday counter (in progress)

### Technologies Used

- express : web framework
- typescripst : Primary language
- NodeJS : Javascript server runtime environment
- Nodemon : Used for automatic server restart
- TypeORM : Database Abstraction
- MySQL : Chosen Database for persistence layer
- Husky : Pre-commit hook to ensure code format
- Prettier : Code Formatter
- eslint : Code Linter
- ngrok : Used for HTTPS Tunneling
- jest : unit testing library
- supertest : api testing library

## Setup and Deployment

### Code Testing

To test app use the following command

```
npm run test
```

### Manual Setup

1. Clone or download the contents of this repository
2. Install ngrok, Official tutorial can be found [here](https://ngrok.com/)
3. Create a mysql database with any name
4. Install Dependencies using :
   ```
   npm -i
   ```
5. Create file with the name `.env` with the contents following the format in `.env.example`
6. Set up Facebook Page and connect Messenger webhook to page, official tutorial can be found [here](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup)
7. Run app in development mode using :

   ```
   npm run start:dev
   ```

8. Expose endpoint using ngrok with the following command :
   ```
   ./ngrok http {PORT}
   ```
9. You are ready to communicate with widya

## Message Endpoints

    path: '/messages',
    method: 'get',
    desc: Get all messages,

---

    path: '/messages/:id',
    method: 'get',
    desc: get message by id,

---

    path: '/messages',
    method: 'post',
    desc: post new message,
    format : {
        "text" : "sometext"
    }

---

    path: '/messages/:id',
    method: 'delete',
    action: delete message by id,
