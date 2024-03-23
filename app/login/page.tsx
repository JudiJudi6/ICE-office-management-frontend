"use client";

import Input from "@/components/ui/Input";
import TextLink from "@/components/ui/TextLink";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

export default function LogIn() {
  const [email, setEmail] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-bgDark">
      <div className="bg-white">
        <div>
          <h3>Log in</h3>
          <p>
            Doesn&apos;t have an account yet?{" "}
            <TextLink href="/signup">Sign Up</TextLink>
          </p>
          <form onSubmit={onSubmit}>
            <div>
              <Input
                id="email"
                placeholder="Email"
                setValue={setEmail}
                type="email"
                label="Enter email"
              />
            </div>
            <div>
              <Input
                id="password"
                placeholder="Password"
                setValue={setPassword}
                type="password"
                label="Enter password"
              />
            </div>
            <button>submit</button>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
}
