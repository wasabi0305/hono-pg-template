import { z } from "@hono/zod-openapi";

// Define validation schemas using zod
export const UserIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: 1,
    }),
});

export const UserCreateSchema = z
  .object({
    email: z.string().email().openapi({ example: "user@example.com" }),
    name: z.string().min(1).openapi({ example: "John Doe" }),
  })
  .openapi("UserCreate");

export const UserUpdateSchema = z
  .object({
    email: z
      .string()
      .email()
      .optional()
      .openapi({ example: "user@example.com" }),
    name: z.string().min(1).optional().openapi({ example: "John Doe" }),
  })
  .refine((data) => data.email !== undefined || data.name !== undefined, {
    message: "At least one field (email or name) must be provided",
  })
  .openapi("UserUpdate");

export const UserResponseSchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }),
    email: z.string().email().openapi({ example: "user@example.com" }),
    name: z.string().openapi({ example: "John Doe" }),
  })
  .openapi("User");

export const ErrorResponseSchema = z
  .object({
    error: z.string().openapi({ example: "Error message" }),
  })
  .openapi("Error");

export const DeleteResponseSchema = z
  .object({
    message: z.string().openapi({ example: "User deleted successfully" }),
    user: UserResponseSchema,
  })
  .openapi("DeleteResponse");
