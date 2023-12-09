# L-2-assignment-2
This is  assignment-2 of level-2

# The Necessary Instruction to Execute this application locally:



-  Then install the packages with `yarn install`
-  Run the application in development Environment with this command: `start:dev`
-  Run the application in production Environment with this command: `start:prod`
-  Build the Application with `yarn build`
-  To check linting error use this command: `yarn lint`
-  To fix linting error use this command : `yarn lint:fix`
-  To check prettier use this command `yarn prettier`
-  To check prettier use this command `yarn prettier:fix`

# Used Technologies:

-  Express
-  TypeScript
-  Mongoose
-  Cors
-  Dotenv
-  Bcrypt
-  Eslint
-  Prettier
-  Zod

# Api End points :

-  ## Create new User:

   -  method: `POST`
   -  route: `/api/users`
   -  `Request Body:`

   ```json
   {
      "userId": 1,
      "username": "monayem",
      "password": "password",
      "fullName": {
         "firstName": "monayem",
         "lastName": "hossain"
      },
      "age": 32,
      "email": "monayem@example.com",
      "isActive": true,
      "hobbies": ["Reading", "Traveling"],
      "address": {
         "street": "120 Nazrul Street",
         "city": "Hill town",
         "country": "Bangladesh"
      }
   }
   ```

   -  Response :

   ```json
   {
      "success": true,
      "message": "Users fetched successfully!",
      "data": {
         "userId": 1,
         "username": "monayem",
         "fullName": {
            "firstName": "monayem",
            "lastName": "hossain"
         },
         "age": 30,
         "email": "monayem@example.com",
         "isActive": true,
         "hobbies": ["Reading", "Writing"],
          "address": {
         "street": "120 Nazrul Street",
         "city": "Hill town",
         "country": "Bangladesh"
      },
         "__v": 0
      }
   }
   ```

-  ## Get All Users:

   -  method: `GET`
   -  route: `/api/users`
   -  Response:

   ```json
   {
      "success": true,
      "message": "Users fetched successfully!",
      "data": [
         {
            "username": "monayem",
            "fullName": {
               "firstName": "monayem",
               "lastName": "hossain"
            },
            "age": 32,
            "email": "monayem@example.com",
           "address": {
         "street": "120 Nazrul Street",
         "city": "Hill town",
         "country": "Bangladesh"
      }
         }

         // others user data:
      ]
   }
   ```

-  ### Get Single User By `userId`:

   -  method: `GET`,
   -  route: `/api/users/:userId`,
   -  params: pass `userId` as params
   -  Response:

   ```json
   {
      "success": true,
      "message": "User fetched successfully",
      "data": {
         "userId": 1,
         "username": "monayem",
         "fullName": {
            "firstName": "monayem",
            "lastName": "hossain"
         },
         "age": 32,
         "email": "monayem@example.com",
         "isActive": true,
         "hobbies": ["Reading", "Writing"],
          "address": {
         "street": "120 Nazrul Street",
         "city": "Hill town",
         "country": "Bangladesh"
      }
      }
   }
   ```

-  ### Update Single User By `userId`

   -  method: `PUT`
   -  route: `/api/users/:userId/`
   -  params: pass `userId` as params
   -  Request Body:

      ```json
      {
         "userId": 1,
         "username": "monayem",
         "fullName": {
            "firstName": "Abdul",
            "lastName": "Momin"
         },
         "age": 30,
         "email": "momin@example.com",
         "isActive": true,
         "hobbies": ["Reading", "Traveling"],
         "address": {
         "street": "120 Nazrul Street",
         "city": "Hill town",
         "country": "Bangladesh"
      }
      }
      ```

   -  Response :

   ```json
   {
      "success": true,
      "message": "User updated successfully!",
      "data": {
          "userId": 1,
         "username": "monayem",
         "fullName": {
            "firstName": "Abdul",
            "lastName": "Momin"
         },
         "age": 30,
         "email": "momin@example.com",
         "isActive": true,
         "hobbies": ["Reading", "Traveling"],
         "address": {
         "street": "120 Nazrul Street",
         "city": "Hill town",
         "country": "Bangladesh"
      }
   }
   ```

-  ### Delete User with `userId`:

   -  method: `delete`,
   -  route: `/api/users/:userId/`
   -  params: pass `userId` as params
   -  Response:

   ```json
   {
      "success": false,
      "message": "User not found",
      "error": {
         "code": 404,
         "description": "User not found!"
      }
   }
   ```

-  ### Create an order on user object By `userId`:

   -  method: `POST`,
   -  route: `/api/users/:userId/orders`
   -  params: pass `userId` as params
   -  Request:

   ```json
   {
      "productName": "Suger",
      "price": 100,
      "quantity": 1
   }
   ```

   -  Response:

   ```json
   {
      "success": true,
      "message": "Order created successfully!",
      "data": null
   }
   ```

-  ### Get user all orders by `userId`:

   -  method: `GET`
   -  route: `/api/users/:userId/orders/`
   -  params: pass `userId` as params
   -  Response :

   ```json
   {
      "success": true,
      "message": "Order created successfully!",
      "data": {
         "orders": [
           {
      "productName": "Suger",
      "price": 100,
      "quantity": 1
   }
         ]
      }
   }
   ```

-  ### Get User's orders totalPrice by `userId`:

   -  method: `GET`
   -  route: `/api/users/:userId/orders/`
   -  params: pass `userId` as params
   -  Response :

   ```json
   {
      "success": true,
      "message": "Total price calculated successfully!",
      "data": {
         "totalPrice": 0
      }
   }
   ```

# Finally Deployed On cyclic :

https://difficult-tan-jodhpurs.cyclic.app/

# Thank you 

