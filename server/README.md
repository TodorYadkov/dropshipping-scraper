<span style="font-size: 3em;">Server</span>

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
  - **Method:** POST
  - **Endpoint:** `/users/login`

- **POST /users/register**
  - **Description:** Register a new user.
  - **Method:** POST
  - **Endpoint:** `/users/register`

- **GET /users/logout**
  - **Description:** Log out the currently authenticated user.
  - **Method:** GET
  - **Endpoint:** `/users/logout`

- **GET /users/profile**
  - **Description:** Retrieve user profile information.
  - **Method:** GET
  - **Endpoint:** `/users/profile`

- **PUT /users/profile**
  - **Description:** Update user profile information.
  - **Method:** PUT
  - **Endpoint:** `/users/profile`

- **POST /users/forgot-password**
  - **Description:** Initiate the forgot password process (with email notification).
  - **Method:** POST
  - **Endpoint:** `/users/forgot-password`

- **PUT /users/reset-password**
  - **Description:** Reset user password.
  - **Method:** PUT
  - **Endpoint:** `/users/reset-password`

### Products

- **POST /products**
  - **Description:** Add a new product.
  - **Method:** POST
  - **Endpoint:** `/products`

- **GET /products**
  - **Description:** Retrieve a list of all products.
  - **Method:** GET
  - **Endpoint:** `/products`

- **GET /products/:productId**
  - **Description:** Retrieve details of a specific product.
  - **Method:** GET
  - **Endpoint:** `/products/:productId`

- **PUT /products/:productId**
  - **Description:** Update details of a specific product.
  - **Method:** PUT
  - **Endpoint:** `/products/:productId`

- **DELETE /products/:productId**
  - **Description:** Delete a specific product.
  - **Method:** DELETE
  - **Endpoint:** `/products/:productId`

### Extensions

- **GET /extensions**
  - **Description:** Retrieve a list of all extensions.
  - **Method:** GET
  - **Endpoint:** `/extensions`

- **POST /extensions**
  - **Description:** Add a new extension.
  - **Method:** POST
  - **Endpoint:** `/extensions`

- **PUT /extensions**
  - **Description:** Update details of an extension.
  - **Method:** PUT
  - **Endpoint:** `/extensions`

- **DELETE /extensions/:extensionId**
  - **Description:** Delete a specific extension.
  - **Method:** DELETE
  - **Endpoint:** `/extensions/:extensionId`

- **PUT /extensions/reset-error**
  - **Description:** Reset error status for extensions.
  - **Method:** PUT
  - **Endpoint:** `/extensions/reset-error`

- **PUT /extensions/react-start**
  - **Description:** Initiate start process for extensions.
  - **Method:** PUT
  - **Endpoint:** `/extensions/react-start`

- **PUT /extensions/react-stop**
  - **Description:** Initiate stop process for extensions.
  - **Method:** PUT
  - **Endpoint:** `/extensions/react-stop`

- **PUT /extensions/logout**
  - **Description:** Log out from an extension.
  - **Method:** PUT
  - **Endpoint:** `/extensions/logout`

- **GET /extensions/get-one**
  - **Description:** Retrieve information about a specific extension.
  - **Method:** GET
  - **Endpoint:** `/extensions/get-one`

- **PUT /extensions/put-one**
  - **Description:** Update details of a specific extension.
  - **Method:** PUT
  - **Endpoint:** `/extensions/put-one`

- **PUT /extensions/start**
  - **Description:** Start a specific extension.
  - **Method:** PUT
  - **Endpoint:** `/extensions/start`

- **PUT /extensions/stop**
  - **Description:** Stop a specific extension.
  - **Method:** PUT
  - **Endpoint:** `/extensions/stop`

- **GET /extensions/status**
  - **Description:** Retrieve the current status of all extensions.
  - **Method:** GET
  - **Endpoint:** `/extensions/status`

- **PUT /extensions/error**
  - **Description:** Update error status for extensions.
  - **Method:** PUT
  - **Endpoint:** `/extensions/error`

### Admin

- **GET /admin**
  - **Description:** Retrieve general admin information.
  - **Method:** GET
  - **Endpoint:** `/admin`

- **PUT /admin/role**
  - **Description:** Update user roles (admin, premium).
  - **Method:** PUT
  - **Endpoint:** `/admin/role`

- **PUT /admin/disable**
  - **Description:** Disable user accounts.
  - **Method:** PUT
  - **Endpoint:** `/admin/disable`

- **PUT /admin/enable**
  - **Description:** Enable user accounts.
  - **Method:** PUT
  - **Endpoint:** `/admin/enable`

- **GET /admin/statistic**
  - **Description:** Retrieve statistical information for admin purposes.
  - **Method:** GET
  - **Endpoint:** `/admin/statistic`

### Statistics

- **GET /statistics/general**
  - **Description:** Retrieve general statistical information.
  - **Method:** GET
  - **Endpoint:** `/statistics/general`