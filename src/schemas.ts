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
    profile: z.object({
      sex: z.enum(["MALE", "FEMALE"]).openapi({ example: "MALE" }),
      dateOfBirth: z.coerce.date().openapi({ example: "2000-01-01T00:00:00Z" }),
      profileText: z.string().min(1).openapi({ example: "Hello, world!" }),
      human: z.object({
        sex: z.enum(["MALE", "FEMALE"]).openapi({ example: "MALE" }),
        dateOfBirth: z.coerce
          .date()
          .openapi({ example: "2000-01-01T00:00:00Z" }),
        address: z.string().min(1).openapi({ example: "Tokyo" }),
      }),
    }),
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
    profile: z
      .object({
        sex: z.enum(["MALE", "FEMALE"]).optional().openapi({ example: "MALE" }),
        dateOfBirth: z.coerce
          .date()
          .optional()
          .openapi({ example: "2000-01-01T00:00:00Z" }),
        profileText: z
          .string()
          .min(1)
          .optional()
          .openapi({ example: "Hello, world!" }),
        human: z
          .object({
            sex: z
              .enum(["MALE", "FEMALE"])
              .optional()
              .openapi({ example: "MALE" }),
            dateOfBirth: z.coerce
              .date()
              .optional()
              .openapi({ example: "2000-01-01T00:00:00Z" }),
            address: z.string().min(1).optional().openapi({ example: "Tokyo" }),
          })
          .optional(),
      })
      .optional(),
  })
  .openapi("UserUpdate");

export const UserResponseSchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }),
    email: z.string().email().openapi({ example: "user@example.com" }),
    name: z.string().openapi({ example: "John Doe" }),
    profile: z
      .object({
        id: z.number().int().openapi({ example: 1 }),
        sex: z.enum(["MALE", "FEMALE"]).openapi({ example: "MALE" }),
        dateOfBirth: z.date().transform((value) => value.toISOString()),
        profileText: z.string().openapi({ example: "Hello, world!" }),
        userId: z.number().int().openapi({ example: 1 }),
        human: z
          .object({
            id: z.number().int().openapi({ example: 1 }),
            sex: z.enum(["MALE", "FEMALE"]).openapi({ example: "MALE" }),
            dateOfBirth: z.date().transform((value) => value.toISOString()),
            address: z.string().openapi({ example: "Tokyo" }),
            profileId: z.number().int().openapi({ example: 1 }),
          })
          .nullable(),
      })
      .nullable(),
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

export const TagCreateSchema = z
  .object({
    tag: z.string().min(1).openapi({ example: "Likes salmon" }),
  })
  .openapi("TagCreate");

export const TagResponseSchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }),
    tag: z.string().openapi({ example: "Likes salmon" }),
  })
  .openapi("Tag");

export const TagIdSchema = z.object({
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

export const DeleteTagSchema = z
  .object({
    message: z.string().openapi({ example: "Tag deleted successfully" }),
    tag: TagIdSchema,
  })
  .openapi("DeleteTag");

export const ProfileTagResponseSchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }),
    userId: z.number().int().openapi({ example: 1 }),
    tag: z.object({
      id: z.number().int().openapi({ example: 1 }),
      tag: z.string().openapi({ example: "Likes salmon" }),
    }),
  })
  .openapi("Tag");

export const ProfileTagCreateSchema = z
  .object({
    tagId: z.number().openapi({ example: 1 }),
  })
  .openapi("ProfileTagCreate");

export const ProfileTagIdSchema = z.object({
  userId: z.coerce
    .number()
    .int()
    .positive()
    .openapi({
      param: {
        name: "userId",
        in: "path",
      },
      example: 1,
    }),
  tagId: z.coerce
    .number()
    .int()
    .positive()
    .openapi({
      param: {
        name: "tagId",
        in: "path",
      },
      example: 1,
    }),
});

export const DeleteProfileTagSchema = z
  .object({
    message: z.string().openapi({ example: "ProfileTag deleted successfully" }),
    tag: ProfileTagResponseSchema,
  })
  .openapi("DeleteTag");

export const LikeResponseSchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }),
    senderId: z.number().int().openapi({ example: 1 }),
    recipientId: z.number().int().openapi({ example: 1 }),
  })
  .openapi("Like");

export const LikeCreateSchema = z
  .object({
    recipientId: z.number().openapi({ example: 1 }),
  })
  .openapi("LikeCreate");
