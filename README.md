# Blockstarter

Blockstarter is a web application designed to streamline the process of submitting and managing crypto projects. It provides a submission form where users can input detailed project information which is then processed and stored in a PostgreSQL database. The application is built using Ruby on Rails for the backend, with React and TypeScript powering the frontend, styled with Material UI.

## Overview

The Blockstarter architecture consists of a Ruby on Rails backend, a PostgreSQL database, and a React frontend. This setup allows for efficient processing and storage of project submissions, while offering a dynamic and responsive user interface. The application utilizes RESTful API endpoints for CRUD operations, ensuring a seamless flow of data.

## Features

- Project Submission: Users can submit detailed information about their crypto projects through a form.
- Data Storage: Submitted projects are stored in a PostgreSQL database.
- Dynamic Interface: A responsive and user-friendly interface built with React and Material UI.

## Getting started

### Requirements

- Ruby (version 3.2.4)
- Node.js
- PostgreSQL (version 16.x)

### Quickstart

1. Clone the repository and navigate into the project directory.
2. Install backend dependencies with `bundle install`.
3. Setup the database with `rails db:create db:migrate`.
4. Install frontend dependencies with `npm install`.
5. Start the Rails server with `rails s` and the React development server in another terminal with `npm start`.

### License

Copyright (c) 2024. All rights reserved.