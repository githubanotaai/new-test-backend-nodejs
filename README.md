# Product Catalog Management System API
[![Deploy to AWS Lambda](https://github.com/andrelcunha/new-test-backend-nodejs/actions/workflows/deploy.yml/badge.svg)](https://github.com/andrelcunha/new-test-backend-nodejs/actions/workflows/deploy.yml)

## Overview

This is a Node.js backend API for a product catalog management system in a marketplace application. The API is built with TypeScript and Express.js, and uses MongoDB for data persistence. It provides basic CRUD operations for data entities (products, categories), and includes error handling and middleware for a better user experience.


This is a Node.js backend API for a product catalog management system in a marketplace application. The API provides basic CRUD operations for data entities (products, categories), database connection using MongoDB, and error handling and middleware for a better user experience.

## Installation

1. Clone the repository: `git clone https://github.com//your-repo-name.git`
2. Navigate to the project directory: `cd your-repo-name`
3. Install the dependencies: `npm install`
4. Create a `.env` file in the root of your project and insert your key-value pairs in the following format of `KEY=VALUE`:
   ```env
   MONGO_URI=your_mongodb_uri
   PORT=your_port_number
   ```
5. Run the build script: `npm run build`

## Usage

1. To start the application in development mode, run: `npm run start:dev`
2. To start the application in production mode, run: `npm run start:prod`

## Environment Variables

The application uses the following environment variables:

- `MONGO_URI`: Your MongoDB URI.
- `PORT`: The port number on which your application will run.

## Future Work

- **User Stories Implementation**: Ensure all user stories are implemented, including associating a product with a category and ensuring a product can only be associated with one category at a time.
- **AWS SQS for Catalog Change Notifications**: Implement a feature to publish changes to the "catalog-emit" topic in the AWS SQS service whenever there is a change in the product catalog.
- **AWS S3 for Storing the Catalog JSON**: Implement a consumer that listens to catalog changes for a specific owner. When the consumer receives a message, search the database for that owner's catalog, generate the catalog JSON, and publish it to an AWS S3 service bucket.
- **Unit Tests**: Implement unit tests to ensure the functionality of your application.
- **Logging Mechanisms**: Implement logging mechanisms to track the operations and possible errors in your application.
- **Documentation**: Improve the documentation quality, including instructions on how to run your application and an explanation of your code.
- **Code Organization and Readability**: Enhance code readability and maintainability through refactoring and documentation. Ensure proper structure of the application layers and effective use of environment variables.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your pull request adheres to the following guidelines:

- Write clear meaningful git commit messages (Do read this).
- Make sure your PR's description contains GitHub's special keyword references that automatically close the related issue when the PR is merged. (More info at this link).
- When you create a Pull Request, make sure to review the changes you are proposing, tell us why you are proposing them, and how you tested that the changes you are introducing work as expected.
- Provide tests for your changes.
- End all files with a newline.

## License

This project is licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).
