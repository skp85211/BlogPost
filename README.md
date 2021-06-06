# BlogPost
To Run Code, follow these steps : <br>
1. Create database in postgreSQL named `blog`
2. Clone this Repository and go to BlogPost directory
3. Before this make you have installed sequelize cli, follow documentation https://sequelize.org/master/manual/migrations.html 
4. Run Migration, use this command :
      1. >npx sequelize-cli db:migrate
5. Once done, Run server from root directory (BlogPost) :
      1. >nodemon server.js
6. Once server is up and running, you can see port number in console and can test APIs
7. You can also refer [Router](https://github.com/skp85211/BlogPost/blob/master/router) `index.js` to find all APIs routes
8. To Test APIs all body parameters input should be in `x-www-form-urlencoded`, Query Parameter in `Params` and JWT token in `Headers` with KEY as `access-token` and Value as JWT token in `Postman`.
9. Response will always be in format of :
>{`success`:"", `data`:{}, `error`:""}

## ALL API Endpoints
### `METHOD` &nbsp;&nbsp;&nbsp;&nbsp;    PATH            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; USE 
#### `POST` &nbsp; /user/signup  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User SignUp
Input Body Parameters: </br>
>name: "string" <br>
email: "string" //can take email or phone number (both verified by regex) <br>
password: "string" //stores encrypted password <br>

Response: <br>
>{<br>
>success: "true or false", <br>
data: "Object", <br>
error: "string"<br>
}<br>

#### `POST` &nbsp; /user/login  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; User Login
Input Body Parameters: </br>
>email: "string"<br>
password: "string" <br>

Response: <br>
>{<br>
>success: "true or false", <br>
data:{<br>
        "token": "Jwt Token (use it for further api request as access code) "<br>
    },<br>
    "error": "String"<br>
}<br>

