import { getPrisma } from "./prisma-get.js";
import type { RouteHandler } from "@hono/zod-openapi";
import type { TypedResponse } from "hono";
import {
  getUsersRoute,
  createUserRoute,
  getUserByIdRoute,
  updateUserRoute,
  deleteUserRoute,
  createTagRoute,
  deleteTagRoute,
  getTagsRoute,
  createProfileTagRoute,
  getProfileTagsRoute,
  deleteProfileTagRoute,
  createLikeRoute,
} from "./routes.js";

// Define environment bindings type
type Env = {
  Bindings: {
    DATABASE_URL: string;
  };
};

// Handler functions
export const handleGetUsers: RouteHandler<typeof getUsersRoute, Env> = async (
  c
) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const users = await prisma.user.findMany({
      include: { profile: { include: { human: true } } },
    });
    return c.json(users) as TypedResponse<typeof users, 200, "json">;
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: "Failed to fetch users" }, 500) as TypedResponse<
      { error: string },
      500,
      "json"
    >;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleCreateUser: RouteHandler<
  typeof createUserRoute,
  Env
> = async (c) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const body = c.req.valid("json");

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        profile: {
          create: {
            sex: body.profile.sex,
            dateOfBirth: body.profile.dateOfBirth,
            profileText: body.profile.profileText,
            human: {
              create: {
                sex: body.profile.human.sex,
                dateOfBirth: body.profile.human.dateOfBirth,
                address: body.profile.human.address,
              },
            },
          },
        },
      },
      include: { profile: { include: { human: true } } },
    });

    return c.json(user, 201) as TypedResponse<typeof user, 201, "json">;
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500) as TypedResponse<
      { error: string },
      500,
      "json"
    >;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleGetUserById: RouteHandler<
  typeof getUserByIdRoute,
  Env
> = async (c) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const { id } = c.req.valid("param");

    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: { include: { human: true } } },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404) as TypedResponse<
        { error: string },
        404,
        "json"
      >;
    }

    return c.json(user) as TypedResponse<typeof user, 200, "json">;
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.json({ error: "Failed to fetch user" }, 500) as TypedResponse<
      { error: string },
      500,
      "json"
    >;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleUpdateUser: RouteHandler<
  typeof updateUserRoute,
  Env
> = async (c) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");

    const user = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        profile: {
          update: {
            sex: body.profile?.sex,
            dateOfBirth: body.profile?.dateOfBirth,
            profileText: body.profile?.profileText,
            human: {
              update: {
                sex: body.profile?.human?.sex,
                dateOfBirth: body.profile?.human?.dateOfBirth,
                address: body.profile?.human?.address,
              },
            },
          },
        },
      },
      include: { profile: { include: { human: true } } },
    });

    return c.json(user) as TypedResponse<typeof user, 200, "json">;
  } catch (error: any) {
    console.error("Error updating user:", error);

    // Check for Prisma's P2025 error (record not found)
    if (error.code === "P2025") {
      return c.json({ error: "User not found" }, 404) as TypedResponse<
        { error: string },
        404,
        "json"
      >;
    }

    return c.json({ error: "Failed to update user" }, 500) as TypedResponse<
      { error: string },
      500,
      "json"
    >;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleDeleteUser: RouteHandler<
  typeof deleteUserRoute,
  Env
> = async (c) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const { id } = c.req.valid("param");

    const user = await prisma.user.delete({
      where: { id },
      include: { profile: { include: { human: true } } },
    });

    return c.json({
      message: "User deleted successfully",
      user,
    }) as TypedResponse<{ message: string; user: typeof user }, 200, "json">;
  } catch (error: any) {
    console.error("Error deleting user:", error);

    // Check for Prisma's P2025 error (record not found)
    if (error.code === "P2025") {
      return c.json({ error: "User not found" }, 404) as TypedResponse<
        { error: string },
        404,
        "json"
      >;
    }

    return c.json({ error: "Failed to delete user" }, 500) as TypedResponse<
      { error: string },
      500,
      "json"
    >;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleCreateTag: RouteHandler<typeof createTagRoute, Env> = async (
  c
) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const body = c.req.valid("json");

    const tag = await prisma.tag.create({
      data: {
        tag: body.tag,
      },
    });
    return c.json(tag, 201) as TypedResponse<typeof tag, 201, "json">;
  } catch (error) {
    console.error("Error creating tag:", error);
    return c.json({ error: "Failed to create tag" }, 500) as TypedResponse<
      { error: string },
      500,
      "json"
    >;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleGetTags: RouteHandler<typeof getTagsRoute, Env> = async (
  c
) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const tags = await prisma.tag.findMany();
    return c.json(tags) as TypedResponse<typeof tags, 200, "json">;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return c.json({ error: "Failed to fetch tags" }, 500) as TypedResponse<
      { error: string },
      500,
      "json"
    >;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleDeleteTag: RouteHandler<typeof deleteTagRoute, Env> = async (
  c
) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const { id } = c.req.valid("param");

    const tag = await prisma.tag.delete({
      where: { id },
    });

    return c.json({
      message: "Tag deleted successfully",
      tag,
    }) as TypedResponse<{ message: string; tag: typeof tag }, 200, "json">;
  } catch (error: any) {
    console.error("Error deleting tag:", error);

    // Check for Prisma's P2025 error (record not found)
    if (error.code === "P2025") {
      return c.json({ error: "Tag not found" }, 404) as TypedResponse<
        { error: string },
        404,
        "json"
      >;
    }

    return c.json({ error: "Failed to delete tag" }, 500) as TypedResponse<
      { error: string },
      500,
      "json"
    >;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleCreateProfileTag: RouteHandler<
  typeof createProfileTagRoute,
  Env
> = async (c) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");

    const profileTag = await prisma.profileTag.create({
      data: {
        profile: { connect: { userId: id } },
        tag: { connect: { id: body.tagId } },
      },
      include: { tag: true },
    });
    return c.json(profileTag, 201) as TypedResponse<
      typeof profileTag,
      201,
      "json"
    >;
  } catch (error) {
    console.error("Error creating profileTag:", error);
    return c.json(
      { error: "Failed to create profileTag" },
      500
    ) as TypedResponse<{ error: string }, 500, "json">;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleGetProfileTags: RouteHandler<
  typeof getProfileTagsRoute,
  Env
> = async (c) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const { id } = c.req.valid("param");
    const profileTags = await prisma.profileTag.findMany({
      where: { profile: { userId: id } },
    });
    return c.json(profileTags) as TypedResponse<
      typeof profileTags,
      200,
      "json"
    >;
  } catch (error) {
    console.error("Error fetching profileTags:", error);
    return c.json(
      { error: "Failed to fetch profileTags" },
      500
    ) as TypedResponse<{ error: string }, 500, "json">;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleDeleteProfileTag: RouteHandler<
  typeof deleteProfileTagRoute,
  Env
> = async (c) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const { userId, tagId } = c.req.valid("param");

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      return c.json({ error: "User not found" }, 404) as TypedResponse<
        { error: string },
        404,
        "json"
      >;
    }

    const profileTag = await prisma.profileTag.delete({
      where: { profileId_tagId: { profileId: profile.id, tagId } },
    });

    return c.json({
      message: "ProfileTag deleted successfully",
      profileTag,
    }) as TypedResponse<
      { message: string; profileTag: typeof profileTag },
      200,
      "json"
    >;
  } catch (error: any) {
    console.error("Error deleting profileTag:", error);

    // Check for Prisma's P2025 error (record not found)
    if (error.code === "P2025") {
      return c.json({ error: "ProfileTag not found" }, 404) as TypedResponse<
        { error: string },
        404,
        "json"
      >;
    }

    return c.json(
      { error: "Failed to delete profileTag" },
      500
    ) as TypedResponse<{ error: string }, 500, "json">;
  } finally {
    await prisma?.$disconnect();
  }
};

export const handleCreateLike: RouteHandler<
  typeof createLikeRoute,
  Env
> = async (c) => {
  let prisma = null;
  try {
    prisma = getPrisma(c.env!.DATABASE_URL);
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");

    const like = await prisma.like.create({
      data: {
        sender: { connect: { senderId: id } },
        recipient: { connect: { id: body.recipientId } },
      },
    });
    return c.json(like, 201) as TypedResponse<
      typeof like,
      201,
      "json"
    >;
  } catch (error) {
    console.error("Error sending like:", error);
    return c.json(
      { error: "Failed to send like" },
      500
    ) as TypedResponse<{ error: string }, 500, "json">;
  } finally {
    await prisma?.$disconnect();
  }
};
