"use server";

import { db } from "..";
import { emailTokens } from "../schema";
import { eq } from "drizzle-orm";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db
      .select()
      .from(emailTokens)
      .where(eq(emailTokens.token, email))
      .limit(1)
      .then((res) => res[0]);

    return verificationToken;
  } catch (error) {
    return { error: null };
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken && "id" in existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(emailTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return verificationToken;
};
