"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase-schemas";
import { ShopSignInFormData, shopSignInFormData } from "@/lib/zod-schemas//shop-signin";
import { Button } from "@/components/button";

export default function UserSignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [info, setInfo] = useState<ReactNode>();
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShopSignInFormData>({
    resolver: zodResolver(shopSignInFormData),
  });

  const submitData = async (data: ShopSignInFormData) => {
    console.log(data)
    supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })
  };

  return (
    <>
      <main className="h-screen flex-1 w-full flex items-center justify-center p-3">
        <section className="w-full max-w-xl bg-white p-5 shadow-md rounded-md border border-amber-100">
          <form
            className="space-y-3 select-none"
            onSubmit={handleSubmit(submitData)}
            autoComplete="off"
          >
            <legend className="flex-1 mb-5 text-amber-500">
              <div className="font-bold text-2xl">Sign Up</div>
            </legend>

            {!!info ? <>{info}</> : null}


            <label className="block">
              <span className="block text-sm font-medium text-amber-500">
                Email
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 focus:border-b-2 bg-white text-amber-500 border-b border-amber-500"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email ? (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-amber-500">
                Password
              </span>
              <div className="relative">
                <input
                  className="w-full outline-0 px-2 py-0.5 focus:border-b-2 bg-white text-amber-500 border-b border-amber-500"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password")}
                />
                {showPassword ? (
                  <Eye
                    className="absolute text-amber-500 top-0.5 right-2.5 w-5 cursor-pointer"
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  />
                ) : (
                  <EyeOff
                    className="absolute text-amber-500 top-0.5 right-2.5 w-5 cursor-pointer"
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  />
                )}
              </div>
              {errors.password ? (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              ) : null}
            </label>

            <div className={`w-full flex pt-5`}>
              <Button
                type="submit"
                loading={loading}
              >
                Sign In
              </Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
