import { createRoute, z } from "@hono/zod-openapi";
import {
  UserIdSchema,
  UserCreateSchema,
  UserUpdateSchema,
  UserResponseSchema,
  ErrorResponseSchema,
  DeleteResponseSchema,
} from "./schemas.js";

// Define routes using OpenAPI
export const getUsersRoute = createRoute({
  method: "get",
  path: "/users",
  tags: ["Users"],
  description: "Retrieves a list of all users",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(UserResponseSchema),
        },
      },
      description: "List of users",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Server error",
    },
  },
});

export const createUserRoute = createRoute({
  method: "post",
  path: "/users",
  tags: ["Users"],
  description: "Creates a new user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserCreateSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
      description: "User created successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Bad request",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Server error",
    },
  },
});

export const getUserByIdRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  tags: ["Users"],
  description: "Retrieves a specific user by ID",
  request: {
    params: UserIdSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
      description: "User details",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "User not found",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Server error",
    },
  },
});

export const updateUserRoute = createRoute({
  method: "patch",
  path: "/users/{id}",
  tags: ["Users"],
  description: "Updates a specific user by ID",
  request: {
    params: UserIdSchema,
    body: {
      content: {
        "application/json": {
          schema: UserUpdateSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
      description: "User updated successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Bad request",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "User not found",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Server error",
    },
  },
});

export const deleteUserRoute = createRoute({
  method: "delete",
  path: "/users/{id}",
  tags: ["Users"],
  description: "Deletes a specific user by ID",
  request: {
    params: UserIdSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DeleteResponseSchema,
        },
      },
      description: "User deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "User not found",
    },
    500: {
      content: {
        "application/json": {
          schema: ErrorResponseSchema,
        },
      },
      description: "Server error",
    },
  },
});
