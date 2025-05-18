# School Teaching System

A Node.js and TypeScript-based backend application for managing school teaching operations, including teacher and student management, class scheduling, and more.

## Overview

This project implements a backend system for a school teaching platform. It provides RESTful APIs for managing teachers, students, classes, and schedules. The application is built using Node.js, TypeScript, and TypeORM, and it connects to a PostgreSQL database.

## Features

* Teacher and student management
* Class scheduling and management
* Authentication and authorization
* RESTful API endpoints
* Integration with PostgreSQL using TypeORM

## Getting Started

### Prerequisites

* Node.js and npm installed
* PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LeenBalkhi/School-Teaching-System.git
   cd School-Teaching-System
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the database connection in `ormconfig.json`.

4. Run database migrations (if applicable):

   ```bash
   npm run migration:run
   ```

5. Start the application:

   ```bash
   npm start
   ```

The application will start on the default port (e.g., 3000).

## API Documentation

The API base URL is:

```
https://symphonia-app.herokuapp.com/
```

A Postman collection is available for testing the API endpoints:

[Postman Collection Link](https://www.getpostman.com/collections/e59626d457b64407def6)

## Project Structure

* `src/` - Contains the TypeScript source code files
* `ormconfig.json` - Configuration file for TypeORM
* `package.json` - Project metadata and scripts
* `tsconfig.json` - TypeScript compiler configuration

