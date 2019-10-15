# Meat Angular Api - REST API With Node.js, MongoDB, Fastify, and Swagger (written in TypeScript)

## 1. Let’s Get Started

### The technology we use:

- TypeScript
- Node.js
- Fastify (CORS, Blipp)
- REST APIs
- Swagger
- MongoDB
- Mongoose

Initialize a new project by opening your terminal and executing the following lines of code:

```
mkdir meat-app-api-ts
cd meat-app-api-ts
mkdir src
cd src
touch index.ts
npm init -y
npx gitignore node
```

### Install all the dependencies that we will need

`npm i typescript @types/node eslint eslint-plugin-import nodemon ts-node-dev mongoose fastify fastify-plugin fastify-cors fastify-blipp fastify-swagger boom`

### Below is a brief description of what each package does, quoted from their respective websites:

**typescript** enabling typescript syntax.

**@types/node** help us to resolve node names.

**eslint eslint-plugin-import** help us to resolve import issues than we can have.

**nodemon** is a tool that helps develop Node.js-based applications by automatically restarting the node application when file changes in the directory are detected. nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node, to use nodemon replace the word node on the command line when executing your script.

**ts-node** allow us to run typescript files without transpile javascript to plain text.

**ts-node-dev** tweaked version of node-dev that uses ts-node under the hood.

**mongoose** provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

**fastify fastify-plugin** is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and, as far as we know, it is one of the fastest web frameworks in town.

**fastify-cors** enables the use of CORS in a Fastify application.

**fastify-blipp** prints your routes to the console. So each time your server starts, you know which endpoints are available.

**fastify-swagger** is a swagger documentation generator for fastify. It uses the schemas you declare in your routes to generate a swagger compliant doc.

**boom** provides a set of utilities for returning HTTP errors.

## 2. Running

Once MongoDB has been successfully installed, you can open a new terminal window and start up a MongoDB instance by running the following:

`mongod`

With MongoDB, we do not need to create a database. We can just specify a name in the setup and, as soon as we store data, MongoDB will create this database for us. You can now run the following code in your src directory in your terminal:

`npm start`