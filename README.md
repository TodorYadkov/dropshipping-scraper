# Project Title

Our project is part of the Softuni initiative, providing students with an opportunity to work on a project that closely resembles real-world applications.

This project is managed by [Deyan Danailov](https://github.com/DeyanDanailov) and developed by [Rosen Dobrev](https://github.com/RosenDobrev10), [Todor Yadkov](https://github.com/TodorYadkov) and [Maxim Kraychev](https://github.com/maximkraychev).


## Project Overview

The main purpose of the system is to automate, organize and put to a whole new level the dropshipping experience. It is designed after several years of experience in maintaining and developing custom software in the sphere. The Dropshipping Software System comprises three essential components that work together seamlessly to enhance your dropshipping experience.

## Demo

Check out the live demo of at [https://drop-shipping-trm.vercel.app](https://drop-shipping-trm.vercel.app)

For a quick exploration, you can use the following demo accounts:

- **Demo User:**
  - Email: demo@example.com
  - Password: 12345678
  - Extension name: Extension 1
https://rosendobrev10.github.io/dropshipping-scraper/
## Components

### Chrome Extension

The Chrome Extension is the first pillar of our system, acting as a virtual dropshipping assistant. It specializes in scraping crucial information from Amazon and eBay, ensuring that you have access to up-to-date data. The extension maintains constant communication with a central server to provide real-time information, covering essential details such as prices, product availability and more.

#### Installation

1. Download the extension from [GitHub Releases](https://github.com/TodorYadkov/dropshipping-scraper/releases/latest/download/extension.zip).
2. Extract the extension files into a folder of your choice.<br/> **Note:** Do not delete this folder after the extraction, it is essential for the extension to function correctly.
3. Open [Google Chrome](https://www.google.com/chrome/) and navigate to `chrome://extensions/`.
4. Enable "Developer mode."
5. Click "Load unpacked" and select the folder where you extracted the extension files.

#### Usage

The extension offers key functionalities related to authentication and control:

- **Login:** Users can log in using their email, extension name, and password.
- **Logout:** Users can logout.
- **Start Extension:** Initiate the scraping process.
- **Stop Extension:** Halt the scraping process.

For additional operations, including product management and data interaction, please refer to the next section for detailed information on managing your dropshipping activities.

---

### Client

The Website serves as your control center for efficiently managing your dropshipping business. It provides real-time information about the products you have chosen to track, ensuring you are always in the loop. Easily add new products for monitoring by sharing their Amazon URLs. Our site features a variety of filters, robust user account management, and a permission system, all designed to enhance your user experience.

#### Features

- **Product Management:** Efficiently manage your monitored products.
- **Extension Management:** Control all available extensions remotely from the client application.
- **Admin Panel:** Access powerful admin tools for user and system management.
- **Profile with Avatar Image Upload:** Personalize your profile with an avatar image.
- **Forgot Password with Email Notification:** Seamless password recovery process.
- **Real-time Updates:** Receive real-time information updates via AJAX requests.
- **Statistics:** Detailed information on products, extensions, and users.
- **Search Functionality:** Easily find what you are looking for.
- **Filter Functionality:** Streamline data based on your preferences.
- **Pagination:** Navigate through content effortlessly.
- **Responsive Design:** Enjoy a seamless experience across different devices.

#### Admin Panel

- **User Management:** Admins can control other users by assigning roles like admin or premium.
- **Account Disabling:** Admins can disable user accounts, preventing login.
- **Extension and Product Insights:** Admins can view the count and status of other users, extensions and products.

#### Technologies Used

- React v18.2.0
- React Router Dom v6.17.0
- Tailwind CSS

---

### Server

#### Features

- User authentication
- Image upload to Cloudinary
- Email sending capabilities

#### API Endpoints

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

### Statistics

- **GET /statistics/general**
  - **Description:** Retrieve general statistical information.
  - **Method:** GET
  - **Endpoint:** `/statistics/general`

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

### Additional Extension Endpoints

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


#### Technologies Used

- Node.js
- Express.js
- MongoDB

#### Additional Libraries
- base64url 
- bcrypt 
- cloudinary
- dotenv
- joi 
- jsonwebtoken 
- multer
- nodemailer 