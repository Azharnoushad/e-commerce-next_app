"use server";

import { actionClient } from "@/lib/safe-action";
import { registerSchema } from "@/validationSchema/register-schema";
import bcrpyt from "bcrypt";
import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";

export const emailRegister = actionClient
  .inputSchema(registerSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
    const hashedPassword = await bcrpyt.hash(password, 10);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((res) => res[0]);

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token,
        );

        return { success: "Email Confirmation resent" };
      }
      return { error: "Email already in use" };
    }
    // login for when the use is not registered----------------------
    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });

    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token,
    );

    return { success: "Confirmation Email Sent!" };
  });
