import type { Context } from "hono";
import { getPrisma } from "./prisma-get.js";
import type { UserUpdateInput } from "./dto.js";
import type { HonoRequest } from "hono";

// Type definitions for request validation
interface ValidatedRequest extends HonoRequest {
  valid<T extends string>(target: T): any;
}

interface ValidatedContext extends Context {
  req: ValidatedRequest;
}

// Handler functions
export async function handleGetUsers(c: ValidatedContext) {
  let prisma = null;
  try {
    prisma = getPrisma(c.env.DATABASE_URL);
    const users = await prisma.user.findMany();
    return c.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: "Failed to fetch users" }, 500);
  } finally {
    await prisma?.$disconnect();
  }
}

export async function handleCreateUser(c: ValidatedContext) {
  let prisma = null;
  try {
    prisma = getPrisma(c.env.DATABASE_URL);
    const body = c.req.valid("json");

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
      },
    });

    return c.json(user, 201);
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500);
  } finally {
    await prisma?.$disconnect();
  }
}

export async function handleGetUserById(c: ValidatedContext) {
  let prisma = null;
  try {
    prisma = getPrisma(c.env.DATABASE_URL);
    const { id } = c.req.valid("param");

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.json({ error: "Failed to fetch user" }, 500);
  } finally {
    await prisma?.$disconnect();
  }
}

export async function handleUpdateUser(c: ValidatedContext) {
  let prisma = null;
  try {
    prisma = getPrisma(c.env.DATABASE_URL);
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");

    // Only update fields that are provided
    const updateData: UserUpdateInput = {};
    if (body.email !== undefined) updateData.email = body.email;
    if (body.name !== undefined) updateData.name = body.name;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return c.json(user);
  } catch (error: any) {
    console.error("Error updating user:", error);

    // Check for Prisma's P2025 error (record not found)
    if (error.code === "P2025") {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ error: "Failed to update user" }, 500);
  } finally {
    await prisma?.$disconnect();
  }
}

export async function handleDeleteUser(c: ValidatedContext) {
  let prisma = null;
  try {
    prisma = getPrisma(c.env.DATABASE_URL);
    const { id } = c.req.valid("param");

    const user = await prisma.user.delete({
      where: { id },
    });

    return c.json({ message: "User deleted successfully", user });
  } catch (error: any) {
    console.error("Error deleting user:", error);

    // Check for Prisma's P2025 error (record not found)
    if (error.code === "P2025") {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ error: "Failed to delete user" }, 500);
  } finally {
    await prisma?.$disconnect();
  }
}
