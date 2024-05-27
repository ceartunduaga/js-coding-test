# Strider Javascript UI Coding Assigment

Using the receipts provided here: https://doc.strider.tech/content/receipts.json, design a UI to showcase information about the data. Note: The instructions are intentionally vague to allow you to design the UI how you think best meets the requirements:

## Prerequisites

Make sure you have Node.js and npm installed on your system. You can download Node.js from [nodejs.org](https://nodejs.org/).

## Installation

To install the project dependencies, run the following command in the root directory of the project:

```
npm install
```

To run the app:
```
npm start
```

To run the app test:

```
npm test
```

## Requirements

1. On the home page:
   - Display some high-level stats about the orders.
   - Display links that will take you to a page about a specific customer which shows their order history.
   - Display a link for each item which will take you to a page that shows the number of times that item has been ordered.
2. Additionally, any information you think might be beneficial to see on the pages would be great. Be creative!
3. Create different components on the UI with [Material UI](https://mui.com/material-ui/getting-started/overview/)

**Note:** To route to the different pages, please use [React Router](https://reactrouter.com/en/main), which has already been installed.
**Note:** Material UI has also already been installed.

## Bonuses

1. Demonstrate use of React hooks.

When you have completed the assignment, upload the code to GitHub and update the README to include instructions on how to run the application. Please provide the link to your repository so that we may access it.

## Hint

The app is already configured to proxy requests to https://doc.strider.tech. When you want to hit the endpoint, all you have to do is fetch `/content/receipts.json`.
