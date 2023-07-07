
<h1>Backend Analyst Candidate Test</h1>
Dear developer,

Welcome to the Backend Analyst Candidate Test. This test aims to assess your general knowledge and development speed. Below, you will find the details and requirements for this test.


<strong>The Challenge</strong>

Your task is to develop an API using Node.js for a product catalog management system in a marketplace application. You should analyze and convert the following user stories into routes for the application:

<strong>User Stories:</strong>

- As a user, I want to register a product with its owner, so that I can access its data in the future (title, description, price, category, owner ID).
- As a user, I want to register a category with its owner, so that I can access its data in the future (title, description, owner ID).
- As a user, I want to associate a product with a category.
- As a user, I want to update the data of a product or category.
- As a user, I want to delete a product or category from my catalog.
- A product can only be associated with one category at a time.
- Assume that products and categories belong only to one owner.

- Keep in mind that this is an online product catalog, which means there will be multiple requests for editing items/categories per second, as well as accessing the catalog search endpoint.
- Consider the product catalog as a JSON compilation of all available categories and items owned by a user. This way, the catalog search endpoint does not need to fetch information from the database.
- Whenever there is a change in the product catalog, publish this change to the "catalog-emit" topic in the AWS SQS service.
- Implement a consumer that listens to catalog changes for a specific owner.
- When the consumer receives a message, search the database for that owner's catalog, generate the catalog JSON, and publish it to an AWS S3 service bucket.

<strong>You need to develop this test using the following technologies:</strong>

- MongoDB for the database.
- AWS SQS for the catalog change notifications.
- AWS S3 for storing the catalog JSON.
- Node.js for the backend.
- Express.js as the web framework.

<hr>
<strong>Diagram representing the final structure of the project:</strong> <br><br>
![image](https://github.com/githubanotaai/new-test-backend-nodejs/assets/52219768/504ba448-f128-41db-ae86-18dc19c0dc9d)


<hr>

<strong>Instructions</strong>

<strong>To begin the test, fork this repository, create a branch with your full name, and send us the link to your completed test (link to your repository). If you only clone the repository, you won't be able to push changes, making the pull request more complicated.</strong>
- Use your own AWS account to set up the required services.
- Update the README file with instructions on how to run your application.
- Paste the branch name into the GUPY system and indicate the completion of the test.
- Feel free to provide us with feedback regarding the test.

<strong>Our Evaluation Criteria</strong>
We will assess the following aspects of your solution:

- Knowledge of JavaScript, Node.js, and Express.js.
- Proper structure of the application layers.
- Handling of outgoing calls.
- Effective use of environment variables.
- Implementation of unit tests.
- Logging mechanisms.
- Error handling strategies.
- Documentation quality.
- Code organization, module separation, readability, and comments.
- Commit history.
