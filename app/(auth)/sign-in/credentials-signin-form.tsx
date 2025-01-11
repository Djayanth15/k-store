"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

const CredentialsSignInForm = () => {
  const [state, action, isPending] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            defaultValue={state.input?.email}
            autoComplete="email"
          />
          {state.errors?.email && (
            <p className="text-sm text-red-500">{state.errors?.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={state.input?.password}
            autoComplete="current-password"
          />
          {state.errors?.password && (
            <p className="text-sm text-red-500">{state.errors?.password}</p>
          )}
        </div>
        <div>
          <Button className="w-full" variant="default" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In with credentials"}
          </Button>
        </div>

        {state?.message && (
          <Alert variant={state.success ? "default" : "destructive"}>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link className="link underline" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
