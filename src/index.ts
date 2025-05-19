/**
 * Main application entry point for the User API service
 *
 * This file sets up a Hono.js server with RESTful endpoints for user management.
 * It provides CRUD operations for users using Prisma as the ORM.
 */

import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getUsersRoute,
  createUserRoute,
  getUserByIdRoute,
  updateUserRoute,
  deleteUserRoute,
} from "./routes.js";
import {
  handleGetUsers,
  handleCreateUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
} from "./handlers.js";

// Initialize OpenAPIHono application with environment bindings
const app = new OpenAPIHono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// Configure OpenAPI documentation
app.doc("openapi", {
  openapi: "3.0.0",
  info: {
    title: "User API",
    version: "1.0.0",
    description: "API for managing users",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
});

/**
 * Health check endpoint
 * Returns a simple text response to verify the server is running
 */
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

/**
 * User Routes
 * The following routes handle CRUD operations for the User resource
 */

// Register routes with OpenAPI
app.openapi(getUsersRoute, ((c: any) => {
  return handleGetUsers(c);
}) as any);

app.openapi(createUserRoute, ((c: any) => {
  return handleCreateUser(c);
}) as any);

app.openapi(getUserByIdRoute, ((c: any) => {
  return handleGetUserById(c);
}) as any);

app.openapi(updateUserRoute, ((c: any) => {
  return handleUpdateUser(c);
}) as any);

app.openapi(deleteUserRoute, ((c: any) => {
  return handleDeleteUser(c);
}) as any);

/**
 * Start the server on port 3000
 */
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
