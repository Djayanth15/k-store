import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{1,2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must exactly two decimal places"
  );

// for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters" }),
  brand: z.string().min(2, { message: "Brand must be at least 2 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  stock: z.coerce.number(),
  images: z
    .array(z.string())
    .min(1, { message: "At least one image is required" }),
  price: currency,
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});

//for signing up a user
export const signUpSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, "Password must be less than 32 characters"),
});

//for signing in a user
export const signInSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, "Password must be less than 32 characters"),
});
