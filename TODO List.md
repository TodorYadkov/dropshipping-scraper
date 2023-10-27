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
- endpoint
  - /           - main path - In progress           - /                     - get     - unauthenticated request - Nothing for now
  - /products  - Done          
                                                    - /products             - get     - authenticated request   - Get all products
                                                    - /products             - post    - authenticated request   - Create product
                                                    - /products/:productId  - get     - authenticated request   - Get one product
                                                    - /products/:productId  - put     - authenticated request   - Edit product
                                                    - /products/:productId  - delete  - authenticated request   - Delete product
  - /users - Done    
                                                    - /users/register       - post    - unauthenticated request - Register new user
                                                    - /users/login          - post    - unauthenticated request - Login user
                                                    - /users/logout         - get     - authenticated request   - Logout user
                                                    - /users/profile        - get     - authenticated request   - Get user details
 



# Useful links: 
1. [Deploy back-end info](https://masteringbackend.com/posts/how-to-deploy-your-node-js-backend-project-to-vercel-a-step-by-step-guide)
