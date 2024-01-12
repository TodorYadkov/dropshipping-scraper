# TODO list:

## Status code

- Draft
- In progress
- Done

# Tasks

## First part

1. Create Github Repo - Done
2. Add collaborators - Done
3. Deploy Back-End application - Done
4. Deploy Front-End application - Done
5. Connecting back-end and front-end - Done
6. Write main functionality of the back-end - Done
7. Write main functionality of the front-end - In progress
8. Write main functionality of the extension - In progress

## Second part

Write back-end RESTful API:

- model
- controller

### Endpoints

- **Main Path (In Progress)**

  - `/`
    - Method: GET
    - Authentication: Unauthenticated request
    - Description: Only for testing

- **Products (Done)**

  - `/products`
    - Method: GET
    - Authentication: Authenticated request
    - Description: Get all products
  - `/products`
    - Method: POST
    - Authentication: Authenticated request
    - Description: Create product
  - `/products/:productId`
    - Method: GET
    - Authentication: Authenticated request
    - Description: Get one product
  - `/products/:productId`
    - Method: PUT
    - Authentication: Authenticated request
    - Description: Edit product
  - `/products/:productId`
    - Method: DELETE
    - Authentication: Authenticated request
    - Description: Delete product

- **Users (Done)**
  - `/users`
  - `/users/register`
    - Method: POST
    - Authentication: Unauthenticated request
    - Description: Register new user
  - `/users/login`
    - Method: POST
    - Authentication: Unauthenticated request
    - Description: Login user
  - `/users/logout`
    - Method: GET
    - Authentication: Authenticated request
    - Description: Logout user
  - `/users/profile`
    - Method: GET
    - Authentication: Authenticated request
    - Description: Get user details

# Useful links:

1. [Deploy back-end info](https://masteringbackend.com/posts/how-to-deploy-your-node-js-backend-project-to-vercel-a-step-by-step-guide)

## Extension

- Can be use to get details for product https://www.amazon.com/dp/B00NLZUM36
- Handle situation with no products in DB to show custom error page in new tab on fetchDataFromServer.

## Front-end

- When make login and register do not forget to add property isExtension = false; !!!
- For currency convert https://github.com/fawazahmed0/currency-api?tab=readme-ov-file
