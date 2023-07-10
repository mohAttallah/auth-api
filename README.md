# auth-api

## Deployment URL
[auth-api](https://api-auth-ehg1.onrender.com)

Author: Mohammad Attallah

## Signup 
- **Route:** POST :/signup
- **Description:** Creates a new user .
- **Request Body:** JSON object containing user record ( username,password).
```Json
{
    "username": "moh",
    "password":"123",
    "role":"admin"
}
```
- **Respons:**
```json
{
    "user": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlteW0iLCJpYXQiOjE2ODg1NzM1MzR9.tl7wH0nWe1Wqm1WOcbbMrQrijRSc9qJ8manJg6fj3TY",
        "capabilities": [
            "read"
        ],
        "id": 1,
        "username": "moh",
        "password": "$2b$10$Wx0kn4fWK0J88iOeAog/nOuQ.//h1Gz5Cu9QfqsDkeAXcBZxBRXvS",
        "role": "admin",
        "updatedAt": "2023-07-05T16:12:14.304Z",
        "createdAt": "2023-07-05T16:12:14.304Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlteW0iLCJpYXQiOjE2ODg1NzM1MzR9.tl7wH0nWe1Wqm1WOcbbMrQrijRSc9qJ8manJg6fj3TY"
}
```  



## Signin
- **Route:** POST : /signin
- **Description:** Authorized login  .
- **Request Body:** JSON object (Basic Auth) containing  ( username,password).

```Json
{
    "username": "moh",
    "password":"123"
}
```
- **Respons:** 
```json
{
    "user": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlteW0iLCJpYXQiOjE2ODg1NzM1MzR9.tl7wH0nWe1Wqm1WOcbbMrQrijRSc9qJ8manJg6fj3TY",
        "capabilities": [
            "read"
        ],
        "id": 1,
        "username": "moh",
        "password": "$2b$10$Wx0kn4fWK0J88iOeAog/nOuQ.//h1Gz5Cu9QfqsDkeAXcBZxBRXvS",
        "role": "admin",
        "updatedAt": "2023-07-05T16:12:14.304Z",
        "createdAt": "2023-07-05T16:12:14.304Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlteW0iLCJpYXQiOjE2ODg1NzM1MzR9.tl7wH0nWe1Wqm1WOcbbMrQrijRSc9qJ8manJg6fj3TY"
}
```  

## get All users 
- **Route:**get /users (require Auth) Should Add token (only for admin)
- **Request Body:** JSON object all users signup(username).

## Secret Area 

- **Route:**get /Secret (require Auth) Should Add token 
- **Request Body:** JSON object "Welcome to Secret Area  ".

## api/v1/ modelName

can access any model dynamically by simply writing the model name.can perform GET, POST, PUT, and DELETE operations on any model. However, for testing purposes in this example, I am using the 'food' model

## Get All Record
- **Description:** Get All Data Record on a model .
- **Route:** get: api/v1/food
- **Role:** there is no Role
- **Respons Body:** JSON object all Data on model Food.

### Get One  Record
- **Description:** Get onec Record  model .
- **Route:** get: api/v1/food/id
- **Role:**  there is no Role 
- **Respons Body:** JSON object all Data on model Food.

### Create Record
- **Description:** Create a Record on model .
- **Route:** POST: api/v1/food/
- **Role:**  there is no Role 
- **Request Body:**  

```Json
{
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
            }
 ```
- **Respons Body:** the same data 


### Create Record
- **Description:** Update a Record on model .
- **Route:** PUT: api/v1/food/1
- **Role:**  there is no Role 
- **Request Body:**  

```Json
{
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
            }
 ```
- **Respons Body:** the same data 


### Delete Record 
- **Description:** Delete a Record on model .
- **Route:** DELETE: api/v1/food/1
- **Role:**  there is no Role 

## api/v2/ modelName
the same on v1 but here to do any request need Authentication and Capabilities
## Get All Record
- **Description:** Get All Data Record on a model .
- **Route:** get: api/v1/food &&  && breber token
- **Role:** user , writer ,editor ,admin
- **Respons Body:** JSON object all Data on model Food.

### Get One  Record
- **Description:** Get onec Record  model .
- **Route:** get: api/v1/food/1 &&  && breber token
- **Role:**  user , writer ,editor ,admin
- **Respons Body:** JSON object all Data on model Food.

### Create Record
- **Description:** Create a Record on model .
- **Route:** POST: api/v1/food/ && breber token
- **Role:**  user , writer ,editor ,admin
- **Request Body:**  

```Json
{
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
            }
 ```
- **Respons Body:** the same data 


### Update Record
- **Description:** Update a Record on model .
- **Route:** PUT: api/v1/food/1 && breber token
- **Role:**   writer ,editor ,admin
- **Request Body:**  

```Json
{
                "name": "mansaf",
                "calories": 1000000,
                "type": 'portine',
            }
 ```
- **Respons Body:** the same data 


### Delete Record 
- **Description:** Delete a Record on model .
- **Route:** DELETE: api/v1/food/1 && breber token
- **Role:**   admin




## UML
![UML](lab08.jpg)
## WRRC
![WRRC Photo ](WWRC.png)