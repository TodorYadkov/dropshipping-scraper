# Project Title

Our project is part of the Softuni initiative, providing students with an opportunity to work on a project that closely resembles real-world applications.

This project is managed by [Deyan Danailov](https://github.com/DeyanDanailov) and developed by [Rosen Dobrev](https://github.com/RosenDobrev10), [Todor Yadkov](https://github.com/TodorYadkov) and [Maxim Kraychev](https://github.com/maximkraychev).

## Project Overview

The main purpose of the system is to automate, organize and put to a whole new level the dropshipping experience. It is designed after several years of experience in maintaining and developing custom software in the sphere. The Dropshipping Software System comprises three essential components that work together seamlessly to enhance your dropshipping experience.

## Demo

https://rosendobrev10.github.io/dropshipping-scraper/

Check out the live demo of at []()

For a quick exploration, you can use the following demo accounts:

- **Demo User 1:**

  - Username:
  - Email:
  - Password:

- **Demo User 2:**
  - Username: 
  - Email: 
  - Password: 


## Components

### Chrome Extension

The Browser Extension is the first pillar of our system, acting as a virtual dropshipping assistant. It specializes in scraping crucial information from Amazon and eBay, ensuring that you have access to up-to-date data. The extension maintains constant communication with a central server to provide real-time information, covering essential details such as prices, product availability, and more.

#### Installation

1. Download the extension from [GitHub Releases](https://github.com/TodorYadkov/dropshipping-scraper/releases/latest/download/extension.zip).
2. Extract the extension files into a folder of your choice. **Note:** Do not delete this folder after the extraction, it is essential for the extension to function correctly.
3. Open [Google Chrome](https://www.google.com/chrome/) and navigate to `chrome://extensions/`.
4. Enable "Developer mode."
5. Click "Load unpacked" and select the folder where you extracted the extension files.

#### Usage

The extension offers key functionalities related to authentication and control:

- **Login:** Users can log in using their email, extension name, and password.
- **Start Extension:** Initiate the scraping process.
- **Stop Extension:** Halt the scraping process.

For additional operations, including product management and data interaction, please refer to the next section for detailed information on managing your dropshipping activities.

---

### Frontend

The Website serves as your control center for efficiently managing your dropshipping business. It provides real-time information about the products you've chosen to track, ensuring you're always in the loop. Easily add new products for monitoring by sharing their Amazon URLs. Our site features a variety of filters, robust user account management, and a permissions system, all designed to enhance your user experience.

#### Features

- **Product Management:** Efficiently manage your monitored products.
- **Extension Management:** Control all available extensions remotely from the client application.
- **Admin Panel:** Access powerful admin tools for user and system management.
- **Profile with Avatar Image Upload:** Personalize your profile with an avatar image.
- **Forgot Password with Email Notification:** Seamless password recovery process.
- **Real-time Updates:** Receive real-time information updates via AJAX requests.
- **Statistics:** Detailed information on products, extensions, and users.
- **Search Functionality:** Easily find what you're looking for.
- **Filter Functionality:** Streamline data based on your preferences.
- **Pagination:** Navigate through content effortlessly.
- **Responsive Design:** Enjoy a seamless experience across devices.

#### Admin Panel

- **User Management:** Admins can control other users by assigning roles like admin or premium.
- **Account Disabling:** Admins can disable user accounts, preventing login.
- **Extension and Product Insights:** Admins can view the count and status of other users' extensions and products.

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

### API Endpoints

#### Users

- **POST /users/login**

  - Authenticate and log in a user.

- **POST /users/register**

  - Register a new user.

- **GET /users/logout**

  - Log out the currently authenticated user.

- **GET /users/profile**

  - Retrieve user profile information.

- **PUT /users/profile**

  - Update user profile information.

- **POST /users/forgot-password**

  - Initiate the forgot password process (with email notification).

- **PUT /users/reset-password**
  - Reset user password.

#### Products

- **POST /products**

  - Add a new product.

- **GET /products**

  - Retrieve a list of all products.

- **GET /products/:productId**

  - Retrieve details of a specific product.

- **PUT /products/:productId**

  - Update details of a specific product.

- **DELETE /products/:productId**
  - Delete a specific product.

#### Statistics

- **GET /statistics/general**
  - Retrieve general statistical information.

#### Extensions

- **GET /extensions**

  - Retrieve a list of all extensions.

- **POST /extensions**

  - Add a new extension.

- **PUT /extensions**

  - Update details of an extension.

- **DELETE /extensions/:extensionId**

  - Delete a specific extension.

- **PUT /extensions/reset-error**

  - Reset error status for extensions.

- **PUT /extensions/react-start**

  - Initiate start process for extensions.

- **PUT /extensions/react-stop**

  - Initiate stop process for extensions.

- **PUT /extensions/logout**
  - Log out from an extension.

#### Admin

- **GET /admin**

  - Retrieve general admin information.

- **PUT /admin/role**

  - Update user roles (admin, premium).

- **PUT /admin/disable**

  - Disable user accounts.

- **PUT /admin/enable**

  - Enable user accounts.

- **GET /admin/statistic**
  - Retrieve statistical information for admin purposes.

#### Additional Extension Endpoints

- **GET /extensions/get-one**

  - Retrieve information about a specific extension.

- **PUT /extensions/put-one**

  - Update details of a specific extension.

- **PUT /extensions/start**

  - Start a specific extension.

- **PUT /extensions/stop**

  - Stop a specific extension.

- **GET /extensions/status**

  - Retrieve the current status of all extensions.

- **PUT /extensions/error**
  - Update error status for extensions.

#### Technologies Used

- Node.js
- Express.js
- MongoDB
