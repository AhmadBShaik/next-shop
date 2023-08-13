"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignUpFormData, userSignUpFormData } from "@/lib/zod-schemas/user-signup";
import { Button } from "@/components/button";
import { supabasePublicClient } from "@/clients/browser-clients/supabasePublicClient";

export default function UserSignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [info, setInfo] = useState<ReactNode>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpFormData>({
    resolver: zodResolver(userSignUpFormData),
  });

  const submitData = async (data: UserSignUpFormData) => {
    try {

      const profileStatus = await supabasePublicClient.rpc('check_user_exists', {
        email_to_check: data.email
      }).single()

      console.log('profileStatus', profileStatus.data?.profile_exists, profileStatus.data?.user_exists)

      if (!profileStatus.data?.profile_exists) {
        // create a user/buyer account

        setInfo(
          <div className="bg-green-100 p-2 border border-green-500 text-green-500 rounded w-full">
            ${`Verify Your email, We've sent an email!`}
          </div>
        )
      }

      if (profileStatus.data?.user_exists) {
        // show "shop already exists with this email" error and show "sign in as seller "
        setInfo(
          <div className="bg-red-100 p-2 border border-red-500 text-red-500 rounded w-full">
            User Already Exists
          </div>
        )
      }

      if (profileStatus.data?.profile_exists && !profileStatus.data?.user_exists) {
        // show "shop account is not available for this email" error and show "sign in as user" button
        setInfo(
          <div className="bg-red-100 p-2 border border-red-500 text-red-500 rounded w-full">
            User account is not available for this account
          </div>
        )
      }
    }
    catch (e) {
      console.log("Sign up Error", e)
      setInfo(
        <div className="bg-red-100 p-2 border border-red-500 text-red-500 rounded w-full">
          Something went wrong
        </div>
      )

    }

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
              <div className="text-sm">Create a new account</div>
            </legend>

            {!!info ? <>{info}</> : null}

            <label className="block">
              <span className="block text-sm font-medium text-amber-500">
                Name
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 focus:border-b-2 bg-white text-amber-500 border-b border-amber-500"
                placeholder="Name"
                {...register("name")}
              />
              {errors.name ? (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              ) : null}
            </label>

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

            <label className="block">
              <span className="block text-sm font-medium text-amber-500">
                Confirm password
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 focus:border-b-2 bg-white text-amber-500 border-b border-amber-500"
                type="password"
                autoComplete="false"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              ) : null}
            </label>

            <div className={`w-full flex pt-5`}>
              <Button
                type="submit"
                loading={loading}
              >
                Sign Up
              </Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
