"use server";

import { signIn, signOut } from "@/auth";
import { signInSchema } from "../schema";
import { isRedirectError } from "next/dist/client/components/redirect-error";

//sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const validatedUser = signInSchema.safeParse(rawData);

    if (!validatedUser.success) {
      return {
        success: false,
        message: "Invalid credentials",
        errors: validatedUser.error.flatten().fieldErrors,
        input: rawData,
      };
    }

    await signIn("credentials", {
      email: validatedUser.data.email,
      password: validatedUser.data.password,
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    if (isRedirectError(error)) {
      throw error;
    } else {
      return {
        success: false,
        message: "Invalid credentials",
        input: rawData,
      };
    }
  }
}

//sign out the user
export async function signOutUser() {
  await signOut();
}
