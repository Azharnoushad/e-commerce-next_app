"use server";

import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "@/validationSchema/login-schema";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export const emailSignin = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((res) => res[0]);

    if (existingUser?.email !== email) {
      return { error: "Email not found" };
    }

    // if(!existingUser?.emailVerified) {

    // }

    return { success: email };
  });
