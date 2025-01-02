"use client";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { signIn } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signInAction() {
    signIn(email, password);

    router.push("/");
  }

  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">ログイン</h1>
      <p className="text-sm text-foreground">
        アカウントがない場合は{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          新規登録
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          name="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">パスワード</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            パスワードを忘れた場合
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="パスワード"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton pendingText="ログイン中..." formAction={signInAction}>
          ログイン
        </SubmitButton>
      </div>
    </form>
  );
}
