# Social Timeline App

Welcome to the Social Timeline App! This is a web application built using React, GraphQL, Neo4j, Next.js, and Apollo Client. It allows users to create posts, interact with posts using likes/unlikes, and provides user authentication.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login using NextAuth.js.
- Display a timeline of posts with like/unlike functionality.
- Create new posts and interact with them.
- Backend powered by GraphQL with Neo4j database.

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory: `cd social-timeline-app`.

## Project Structure

Here's an overview of the project structure:

social-timeline-app/
├── components/
├── pages/
│ ├── api/
│ ├── _app.tsx
│ ├── index.tsx
│ ├── login.tsx
│ └── register.tsx
├── graphql/
├── backend/
├── public/
├── styles/
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md


- `components`: Contains reusable React components.
- `pages`: Contains Next.js pages and API routes.
- `graphql`: Holds GraphQL query and mutation definitions.
- `backend`: Backend setup, GraphQL server, and authentication logic.
- `public`: Static assets like images.
- `styles`: Global stylesheets.
- `next.config.js`: Next.js configuration.
- `tsconfig.json`: TypeScript configuration.
- `package.json`: Project dependencies and scripts.

## Usage

1. Install dependencies: `npm install`.
2. Start the development server: `npm run dev`.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
