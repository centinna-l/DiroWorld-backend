# Hackathon Backend application

## Requirnments 

- Your Brain
- Node version: **v21.5.0**
- npm version: **10.2.4**
- Install nodoemon globally: **npm i nodemon -g**


## JSON Response


> API Endpoint response.


```js

{
    message: "Response Message"
    data: {}
}
// status code: 200,201, 400,404

```

> API Error Response

```js

{
    error: "Error Message",
    data: null
}
// status code: 500 (Internal server error)
```

***Make sure to check the <u>status code</u> before you destructure the API Response***


## Environment variables

> MONGODB_URL=mongodb+srv://dbUser:jerry@cluster0.lwj0c.gcp.mongodb.net/?retryWrites=true&w=majority

> JWT_SECRETE=123ecdvreC*&&(())

> PORT=8000

## How to run

- clone the repo
- Install all the dependecies: **npm i**.
- create a **.env** file and save the [environment variables](#environment-variables)
- Run the application: **npm run dev**