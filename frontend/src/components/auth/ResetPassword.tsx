"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import ButtonLoader from "../ui/load/ButtonLoader";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { SendEmailReset, sendPasswordResset } from "@/store/auth/authHandler";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const { isFetching } = useSelector((state: RootState) => state.auth);
  const { token } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmit, setIsSumit] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(token){
      dispatch(sendPasswordResset(password , token , router));
    }else {
      dispatch(SendEmailReset(email , ()=>setIsSumit(true)));
    }
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/signin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to Sign In
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        {!token ? <>
          {isSubmit ? <>
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Check your email
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We sent to your email the reset password link 
            </p>
            <Button size="sm" variant="outline" className="mt-4" startIcon={<QuestionMarkCircleIcon className="size-6"/>}>I Don`t recieve the link</Button>
          </> : <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Enter your email
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your email to reset you password!
              </p>
            </div>
            <div>
              <form onSubmit={submitHandler}>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input placeholder="example@gmail.com" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
                  </div>
                  <div>
                    <Button className="w-full" size="sm">
                      {isFetching ? <ButtonLoader /> : 'Submit'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>}
        </> :
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Enter your new password
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                update your password
              </p>
            </div>
            <div>
              <form onSubmit={submitHandler}>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button className="w-full" size="sm">
                      {isFetching ? <ButtonLoader /> : 'Update'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
