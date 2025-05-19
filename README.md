# Hono PostgreSQL API Template

This project is a template for building RESTful APIs using [Hono](https://hono.dev/) with PostgreSQL database integration via [Prisma ORM](https://www.prisma.io/).

## Features

- **Modern TypeScript Stack**: Built with TypeScript for type safety and better developer experience
- **Hono Framework**: Lightweight, fast, and flexible web framework
- **OpenAPI Integration**: API documentation and validation using `@hono/zod-openapi`
- **PostgreSQL Database**: Robust relational database for data persistence
- **Prisma ORM**: Type-safe database client for PostgreSQL
- **Modular Architecture**: Well-organized code structure for maintainability and scalability

## Project Structure

```
├── prisma/                 # Prisma schema and migrations
│   ├── schema.prisma       # Database schema definition
│   └── migrations/         # Database migrations
├── src/
│   ├── index.ts            # Main application entry point
│   ├── schemas.ts          # Zod validation schemas
│   ├── routes.ts           # API route definitions
│   ├── handlers.ts         # Request handlers
│   ├── dto.ts              # Data transfer object type definitions
│   └── prisma-get.ts       # Prisma client initialization
└── package.json            # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- PostgreSQL database

### Installation

1. Clone this repository
   ```bash
   git clone https://github.com/soltia48/hono-postgresql.git
   cd hono-postgresql
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up your environment variables
   Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
   ```

4. Run database migrations
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

## API Documentation

Once the server is running, you can access the OpenAPI documentation at:
```
http://localhost:3000/openapi
```

## Available Endpoints

- `GET /`: Health check endpoint
- `GET /users`: Get all users
- `POST /users`: Create a new user
- `GET /users/:id`: Get a user by ID
- `PATCH /users/:id`: Update a user by ID
- `DELETE /users/:id`: Delete a user by ID

## Development

### Available Scripts

- `npm run dev`: Start the development server with hot reloading
- `npm run build`: Build the project for production
- `npm start`: Run the production build

## Validation

This project uses `@hono/zod-openapi` for request validation and OpenAPI documentation generation. The validation schemas are defined in `src/schemas.ts`.

## Database

The database schema is defined in `prisma/schema.prisma`. To update the schema, modify this file and run:

```bash
npx prisma migrate dev --name your_migration_name
```

## License

MIT
