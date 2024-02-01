<span style="font-size: 48px;">Server</span>

## Table of Contents
- [Back to Project Documentation](../README.md)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Additional Libraries](#additional-libraries)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Products](#products)
  - [Extensions](#extensions)
  - [Admin](#admin)
  - [Statistics](#statistics)

## Features

- User authentication
- Image upload to Cloudinary
- Email sending capabilities

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Additional Libraries
- base64url 
- bcrypt 
- cloudinary
- dotenv
- joi 
- jsonwebtoken 
- multer
- nodemailer 

## API Endpoints

### Users

- **POST /users/login**
  - **Description:** Authenticate and log in a user.
  - **Method:** `POST`
  - **Endpoint:** `/users/login`
  - **Demo Response:** 
  ```
  {
    "accessToken": "********",
    "userDetails": {
        "_id": "65bb5c9bbc59e1e5e8d768c9",
        "name": "test 1",
        "email": "test1@mail.bg",
        "role": "user",
        "isDisable": false,
        "avatarURL": null,
        "extensionName": "React Client"
    }
  }
  ```

- **POST /users/register**
  - **Description:** Register a new user.
  - **Method:** `POST`
  - **Endpoint:** `/users/register`
  - **Demo Response:** 
  ```
  {
      "accessToken": "********",
      "userDetails": {
          "_id": "65bb5c9bbc59e1e5e8d768c9",
          "name": "test1",
          "email": "test1@abv.bg",
          "role": "user",
          "isDisable": false,
          "avatarURL": null,
          "extensionName": "React Client"
      }
  }
  ```

- **GET /users/logout**
  - **Description:** Log out the currently authenticated user.
  - **Method:** `GET`
  - **Endpoint:** `/users/logout`
  - **Demo Response:**
  ```
  {"message":"Successful logout"}
  ```

- **GET /users/profile**
  - **Description:** Retrieve user profile information.
  - **Method:** `GET`
  - **Endpoint:** `/users/profile`
  - **Demo Response:**
  ```
  {
    "_id": "65845039861e6f68566e84c2",
    "name": "Peter Parker",
    "email": "peter@abv.bg",
    "role": "admin",
    "isExtension": false,
    "createdAt": "2023-12-21T14:48:25.187Z",
    "updatedAt": "2024-02-01T10:51:02.927Z",
    "__v": 0,
    "avatarId": "dropshipping-scraper/ofve0a4hqkqet6o09gbj",
    "avatarURL": "https://res.cloudinary.com/framevibe/image/upload/v1706568943/dropshipping-scraper/ofve0a4hqkqet6o09gbj.jpg",
    "isLogin": true,
    "disable": false,
    "isDisable": false
  }
  ```

- **PUT /users/profile**
  - **Description:** Update user profile information.
  - **Method:** `PUT`
  - **Endpoint:** `/users/profile`
  - **Demo Response:**
  ```
  {
    "accessToken": "********",
    "userDetails": {
        "_id": "65bb5c9bbc59e1e5e8d768c9",
        "name": "test1",
        "email": "test1@abv.bg",
        "role": "user",
        "isDisable": false,
        "avatarURL": "https://res.cloudinary.com/framevibe/image/upload/v1706778867/dropshipping-scraper/gh1hivsrgzxp9xauomfq.jpg",
        "extensionName": "React Client"
    }
  }
  ```

- **POST /users/forgot-password**
  - **Description:** Initiate the forgot password process (with email notification).
  - **Method:** `POST`
  - **Endpoint:** `/users/forgot-password`
  - **Demo Response:**
  ```
  {"message":"Your reset token is send successfully"}
  ```

- **PUT /users/reset-password**
  - **Description:** Reset user password.
  - **Method:** `PUT`
  - **Endpoint:** `/users/reset-password`
  - **Demo Response:**
   ```
   {
    "accessToken": "********",
    "userDetails": {
        "_id": "65bb5c9bbc59e1e5e8d768c9",
        "name": "test1",
        "email": "test1@abv.bg",
        "role": "user",
        "isDisable": false,
        "avatarURL": null,
        "extensionName": "React Client"
    }
  }
   ```

### Products

- **POST /products**
  - **Description:** Add a new product.
  - **Method:** `POST`
  - **Endpoint:** `/products`
  - **Demo Response:**
  ```
  {
    "name": null,
    "description": null,
    "priceAmazon": null,
    "priceEbay": null,
    "currencyAmazon": null,
    "currencyEbay": null,
    "imageURL": null,
    "availability": null,
    "amazonUrl": "https://www.amazon.com/dp/B0CMVRDWLZ",
    "ebayUrl": "https://www.ebay.com/itm/155977280183",
    "rating": null,
    "error": null,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "_id": "65bb634cbc59e1e5e8d76966",
    "createdAt": "2024-02-01T09:24:28.021Z",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "__v": 0
  }
  ```

- **GET /products**
  - **Description:** Retrieve a list of all products.
  - **Method:** `GET`
  - **Endpoint:** `/products`
  - **Demo Response:**
  ```
  [
    {
        "_id": "65bb648abc59e1e5e8d769cd",
        "name": "Acer Swift Go Intel Evo Thin & Light Premium Laptop 14\" 1920x1200",
        "description": "The Best Overall Laptop Experience",
        "priceAmazon": 735,
        "priceEbay": 939.99,
        "currencyAmazon": "USD",
        "currencyEbay": "USD",
        "imageURL": "https://m.media-amazon.com/images/I/81Svdy-MGbL._AC_SX679_.jpg",
        "availability": "In Stock",
        "amazonUrl": "https://www.amazon.com/dp/B0BTQWR77M",
        "ebayUrl": "https://www.ebay.com/itm/375223847443",
        "rating": 4.2,
        "error": null,
        "owner": "65bb5c9bbc59e1e5e8d768c9",
        "createdAt": "2024-02-01T09:29:46.929Z",
        "updatedAt": "2024-02-01T09:29:59.280Z",
        "__v": 0
    },
    {
        "_id": "65bb634cbc59e1e5e8d76966",
        "name": "Lenovo ThinkPad T14 Business Laptop, 14\" FHD IPS Touchscreen, AMD 6-Core Ryzen 5 Pro 5650U",
        "description": "【Work Anywhere, Your Way】Lenovo ThinkPad T14 ",
        "priceAmazon": 709.99,
        "priceEbay": 799.9,
        "currencyAmazon": "USD",
        "currencyEbay": "EUR",
        "imageURL": "https://m.media-amazon.com/images/I/615pOFhZypL._AC_SX679_.jpg",
        "availability": "Only 3 left in stock - order soon.",
        "amazonUrl": "https://www.amazon.com/dp/B0CMVRDWLZ",
        "ebayUrl": "https://www.ebay.com/itm/155977280183",
        "rating": 5,
        "error": null,
        "owner": "65bb5c9bbc59e1e5e8d768c9",
        "createdAt": "2024-02-01T09:24:28.021Z",
        "updatedAt": "2024-02-01T09:29:41.423Z",
        "__v": 0
    }
  ]
  ```

- **GET /products/:productId**
  - **Description:** Retrieve details of a specific product.
  - **Method:** `GET`
  - **Endpoint:** `/products/:productId`
  - **Demo Response:**
  ```
  {
    "_id": "6585ac1e00220be1b169160a",
    "name": "Logitech M510 Wireless Computer Mouse for PC",
    "description": "Your hand can relax in comfort hour after hour with this ergonomically designed mouse.",
    "priceAmazon": 22.99,
    "currencyAmazon": "USD",
    "currencyEbay": "$",
    "imageURL": "https://m.media-amazon.com/images/I/61xgpXecLML.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    "availability": "In Stock",
    "amazonUrl": "https://www.amazon.com/dp/B087Z5WDJ2",
    "ebayUrl": null,
    "rating": 4.7,
    "owner": "65845039861e6f68566e84c2",
    "createdAt": "2023-12-22T15:32:46.745Z",
    "updatedAt": "2024-01-29T22:58:23.631Z",
    "error": null,
    "__v": 0,
    "priceEbay": null
  }
  ```

- **PUT /products/:productId**
  - **Description:** Update details of a specific product.
  - **Method:** `PUT`
  - **Endpoint:** `/products/:productId`
  - **Demo Response:**
  ```
  {
    "_id": "65bb648abc59e1e5e8d769cd",
    "name": "Acer Swift Go Intel Evo Thin & Light Premium Laptop 14\" 1920x1200",
    "priceAmazon": 735,
    "priceEbay": 939.99,
    "currencyAmazon": "USD",
    "currencyEbay": "USD",
    "imageURL": "https://m.media-amazon.com/images/I/81Svdy-MGbL._AC_SX679_.jpg",
    "availability": "In Stock",
    "amazonUrl": "https://www.amazon.com/dp/B0BTQWR77M",
    "ebayUrl": "https://www.ebay.com/itm/375223847443",
    "rating": 4.2,
    "error": null,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:29:46.929Z",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "__v": 0
  }
  ```

- **DELETE /products/:productId**
  - **Description:** Delete a specific product.
  - **Method:** `DELETE`
  - **Endpoint:** `/products/:productId`
  - **Demo Response:**
  ```
  {
    "_id": "65bb634cbc59e1e5e8d76966",
    "name": "Lenovo ThinkPad T14 Business Laptop, 14\" FHD IPS Touchscreen, AMD 6-Core Ryzen 5 Pro 5650U",
    "priceAmazon": 709.99,
    "priceEbay": 799.9,
    "currencyAmazon": "USD",
    "currencyEbay": "EUR",
    "imageURL": "https://m.media-amazon.com/images/I/615pOFhZypL._AC_SX679_.jpg",
    "availability": "Only 3 left in stock - order soon.",
    "amazonUrl": "https://www.amazon.com/dp/B0CMVRDWLZ",
    "ebayUrl": "https://www.ebay.com/itm/155977280183",
    "rating": 5,
    "error": null,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:24:28.021Z",
    "updatedAt": "2024-02-01T09:29:41.423Z",
    "__v": 0
  }
  ```

### Extensions

- **GET /extensions**
  - **Description:** Retrieve a list of all extensions.
  - **Method:** `GET`
  - **Endpoint:** `/extensions`
  - **Demo Response:**
  ```
  [
    {
        "_id": "65bb6651bc59e1e5e8d76a7f",
        "extensionName": "browser 2",
        "isWork": false,
        "isLogin": false,
        "isWorkBrowser": false,
        "error": null,
        "isDefault": false,
        "owner": "65bb5c9bbc59e1e5e8d768c9",
        "createdAt": "2024-02-01T09:37:21.221Z",
        "updatedAt": "2024-02-01T09:37:21.221Z",
        "__v": 0
    },
    {
        "_id": "65bb5c9bbc59e1e5e8d768cb",
        "extensionName": "browser 1",
        "isWork": false,
        "isLogin": true,
        "isWorkBrowser": true,
        "error": null,
        "isDefault": true,
        "owner": "65bb5c9bbc59e1e5e8d768c9",
        "createdAt": "2024-02-01T08:55:55.579Z",
        "updatedAt": "2024-02-01T09:37:21.563Z",
        "__v": 0
    }
  ]
  ```

- **POST /extensions**
  - **Description:** Add a new extension.
  - **Method:** `POST`
  - **Endpoint:** `/extensions`
  - **Demo Response:**
  ```
  {
    "extensionName": "browser 3",
    "isWork": false,
    "isLogin": false,
    "isWorkBrowser": false,
    "accessToken": null,
    "error": null,
    "isDefault": false,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "_id": "65bb692bbc59e1e5e8d76b74",
    "createdAt": "2024-02-01T09:49:31.402Z",
    "updatedAt": "2024-02-01T09:49:31.402Z",
    "__v": 0
  }
  ```

- **PUT /extensions**
  - **Description:** Update details of an extension.
  - **Method:** `PUT`
  - **Endpoint:** `/extensions`
  - **Demo Response:**
  ```
  {
    "_id": "65bb692bbc59e1e5e8d76b74",
    "extensionName": "browser 4",
    "isWork": false,
    "isLogin": false,
    "isWorkBrowser": false,
    "error": null,
    "isDefault": false,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:49:31.402Z",
    "updatedAt": "2024-02-01T09:50:37.758Z",
    "__v": 0
  }
  ```

- **DELETE /extensions/:extensionId**
  - **Description:** Delete a specific extension.
  - **Method:** `DELETE`
  - **Endpoint:** `/extensions/:extensionId`
  - **Demo Response:**
  ```
  {
    "_id": "65bb692bbc59e1e5e8d76b74",
    "extensionName": "browser 4",
    "isWork": false,
    "isLogin": false,
    "isWorkBrowser": false,
    "error": null,
    "isDefault": false,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:49:31.402Z",
    "updatedAt": "2024-02-01T09:50:37.758Z",
    "__v": 0
  }
  ```

- **PUT /extensions/reset-error**
  - **Description:** Reset error status for extensions.
  - **Method:** `PUT`
  - **Endpoint:** `/extensions/reset-error`
  - **Demo Response:**
  ```
  {
    "_id": "65bb692bbc59e1e5e8d76b74",
    "extensionName": "browser 4",
    "isWork": false,
    "isLogin": false,
    "isWorkBrowser": false,
    "error": null,
    "isDefault": false,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:49:31.402Z",
    "updatedAt": "2024-02-01T09:53:17.622Z",
    "__v": 0
  }
  ```

- **PUT /extensions/react-start**
  - **Description:** Initiate start process for extensions.
  - **Method:** `PUT`
  - **Endpoint:** `/extensions/react-start`
  - **Demo Response:**
  ```
  {
    "_id": "65bb692bbc59e1e5e8d76b74",
    "extensionName": "browser 4",
    "isWork": true,
    "isLogin": true,
    "isWorkBrowser": true,
    "error": null,
    "isDefault": false,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:49:31.402Z",
    "updatedAt": "2024-02-01T09:55:34.147Z",
    "__v": 0
  }
  ```

- **PUT /extensions/react-stop**
  - **Description:** Initiate stop process for extensions.
  - **Method:** `PUT`
  - **Endpoint:** `/extensions/react-stop`
  - **Demo Response:**
  ```
  {
    "_id": "65bb692bbc59e1e5e8d76b74",
    "extensionName": "browser 4",
    "isWork": false,
    "isLogin": true,
    "isWorkBrowser": true,
    "error": null,
    "isDefault": false,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:49:31.402Z",
    "updatedAt": "2024-02-01T09:56:11.004Z",
    "__v": 0
  }
  ```

- **PUT /extensions/logout**
  - **Description:** Log out from an extension.
  - **Method:** `PUT`
  - **Endpoint:** `/extensions/logout`
  - **Demo Response:**
  ```
  {
    "_id": "65bb692bbc59e1e5e8d76b74",
    "extensionName": "browser 4",
    "isWork": false,
    "isLogin": false,
    "isWorkBrowser": false,
    "accessToken": null,
    "error": null,
    "isDefault": false,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:49:31.402Z",
    "updatedAt": "2024-02-01T09:57:06.541Z",
    "__v": 0
  }
  ```

- **GET /extensions/get-one**
  - **Description:** Retrieve information about a specific product.
  - **Method:** `GET`
  - **Endpoint:** `/extensions/get-one`
  - **Demo Response:**
  ```
  {
    "_id": "65bb648abc59e1e5e8d769cd",
    "name": "Acer Swift Go Intel Evo Thin & Light Premium Laptop 14\" 1920x1200",
    "description": "The Best Overall Laptop Experience: The Acer Swift Go 14",
    "priceAmazon": 735,
    "priceEbay": 939.99,
    "currencyAmazon": "USD",
    "currencyEbay": "USD",
    "imageURL": "https://m.media-amazon.com/images/I/81Svdy-MGbL._AC_SX679_.jpg",
    "availability": "In Stock",
    "amazonUrl": "https://www.amazon.com/dp/B0BTQWR77M",
    "ebayUrl": "https://www.ebay.com/itm/375223847443",
    "rating": 4.2,
    "error": null,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:29:46.929Z",
    "updatedAt": "2024-02-01T09:56:11.779Z",
    "__v": 0
  }
  ```

- **PUT /extensions/put-one**
  - **Description:** Update details of a specific product.
  - **Method:** `PUT`
  - **Endpoint:** `/extensions/put-one`
  - **Demo Response:**
  ```
  {
    "_id": "65bb648abc59e1e5e8d769cd",
    "name": "Acer Swift Go Intel Evo Thin & Light Premium Laptop 14\" 1920x1200",
    "description": "The Best Overall Laptop Experience: The Acer Swift Go 14",
    "priceAmazon": 735,
    "priceEbay": 939.99,
    "currencyAmazon": "USD",
    "currencyEbay": "USD",
    "imageURL": "https://m.media-amazon.com/images/I/81Svdy-MGbL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    "availability": "In Stock",
    "amazonUrl": "https://www.amazon.com/dp/B0BTQWR77M",
    "ebayUrl": "https://www.ebay.com/itm/375223847443",
    "rating": 4.2,
    "error": null,
    "owner": "65bb5c9bbc59e1e5e8d768c9",
    "createdAt": "2024-02-01T09:29:46.929Z",
    "updatedAt": "2024-02-01T10:05:00.033Z",
    "__v": 0
  }
  ```

- **PUT /extensions/start**
  - **Description:** Start a specific extension.
  - **Method:** `PUT`
  - **Endpoint:** `/extensions/start`
  - **Demo Response:**
  ```
  {"message":"Extension browser 4 is successfully started"}
  ```

- **PUT /extensions/stop**
  - **Description:** Stop a specific extension.
  - **Method:** `PUT`
  - **Endpoint:** `/extensions/stop`
  - **Demo Response:**
  ```
  {"message":"Extension browser 4 is successfully stopped"}
  ```

- **GET /extensions/status**
  - **Description:** Retrieve the current status of all extensions.
  - **Method:** `GET`
  - **Endpoint:** `/extensions/status`
  - **Demo Response:**
  ```
  {"extensionName":"browser 4","isWork":true,"isLogin":true}
  ```

- **PUT /extensions/error**
  - **Description:** Update error status for extensions.
  - **Method:** `PUT`
  - **Endpoint:** `/extensions/error`
  - **Demo Response:**
  ```
  { message: `Extension browser 4 is reported for current error` }
  ```

### Admin

- **GET /admin**
  - **Description:** Retrieve general admin information.
  - **Method:** `GET`
  - **Endpoint:** `/admin`
  ```
  [
    {
        "_id": "65bb5c9bbc59e1e5e8d768c9",
        "name": "test1",
        "email": "test1@abv.bg",
        "avatarURL": "https://res.cloudinary.com/framevibe/image/upload/v1706778867/dropshipping-scraper/gh1hivsrgzxp9xauomfq.jpg",
        "isDisable": false,
        "isLogin": false,
        "role": "user",
        "productCount": 1,
        "extensionCount": 3,
        "extensionsWithIsWorkBrowser": 1,
        "productsWithErrorCount": 0
    }, 
    {
        "_id": "65b23d546183442f83789ea2",
        "name": "test2",
        "email": "test2@abv.bg",
        "avatarURL": "https://res.cloudinary.com/framevibe/image/upload/v1706638151/dropshipping-scraper/u4bewpbplwnwy15xphsv.jpg",
        "role": "admin",
        "isLogin": false,
        "isDisable": false,
        "productCount": 1,
        "extensionCount": 1,
        "extensionsWithIsWorkBrowser": 0,
        "productsWithErrorCount": 0
    }
  ]
  ```

- **PUT /admin/role**
  - **Description:** Update user roles (admin, premium).
  - **Method:** `PUT`
  - **Endpoint:** `/admin/role`
  - **Demo Response:**
  ```
  {
    "_id": "65bb5c9bbc59e1e5e8d768c9",
    "name": "test1",
    "email": "test1@abv.bg",
    "avatarURL": "https://res.cloudinary.com/framevibe/image/upload/v1706778867/dropshipping-scraper/gh1hivsrgzxp9xauomfq.jpg",
    "isDisable": false,
    "isLogin": false,
    "role": "admin"
  }
  ```

- **PUT /admin/disable**
  - **Description:** Disable user accounts.
  - **Method:** `PUT`
  - **Endpoint:** `/admin/disable`
  - **Demo Response:**
  ```
  {
    "_id": "65bb5c9bbc59e1e5e8d768c9",
    "name": "test1",
    "email": "test1@abv.bg",
    "avatarURL": "https://res.cloudinary.com/framevibe/image/upload/v1706778867/dropshipping-scraper/gh1hivsrgzxp9xauomfq.jpg",
    "isDisable": true,
    "isLogin": false,
    "role": "admin"
  }
  ```

- **PUT /admin/enable**
  - **Description:** Enable user accounts.
  - **Method:** `PUT`
  - **Endpoint:** `/admin/enable`
  - **Demo Response:**
  ```
  {
    "_id": "65bb5c9bbc59e1e5e8d768c9",
    "name": "test1",
    "email": "test1@abv.bg",
    "avatarURL": "https://res.cloudinary.com/framevibe/image/upload/v1706778867/dropshipping-scraper/gh1hivsrgzxp9xauomfq.jpg",
    "isDisable": false,
    "isLogin": false,
    "role": "admin"
  }
  ```

- **GET /admin/statistic**
  - **Description:** Retrieve statistical information for admin purposes.
  - **Method:** `GET`
  - **Endpoint:** `/admin/statistic`
  - **Demo Response:**
  ```
  {
    "totalUser": 8,
    "totalLogged": 1,
    "totalExtension": 10,
    "totalExtensionWorked": 1,
    "totalProduct": 2,
    "totalProductErrorCount": 0
  }
  ```

### Statistics

- **GET /statistics/general**
  - **Description:** Retrieve general statistical information.
  - **Method:** `GET`
  - **Endpoint:** `/statistics/general`
  - **Demo Response:**
  ```
  {
    "extensionsCount": 5,
    "extensionsIsWork": 0,
    "extensionsIsLogin": 0,
    "extensionsNotWorked": 5,
    "productsCount": 14,
    "productsErrorCount": 0,
    "availableProductsCount": 14
  }
  ```
