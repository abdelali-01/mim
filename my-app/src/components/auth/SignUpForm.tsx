"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import Select from "../form/Select";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { registerUser } from "@/store/auth/authHandler";

export interface User {
  _id?: string;
  username: string;
  email: string;
  phone: string;
  password?: string;
  isAdmin?: boolean;
  role?: string
}

const userState = {
  username: '',
  email: '',
  phone: '',
  password: '',
  isAdmin: false,
  role: ''
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<User>(userState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(user, () => setUser(userState)));
  }

  return (
    <div className="flex flex-col flex-1 w-full lg:max-w-3/4 no-scrollbar">
      <div className="w-full sm:pt-10 mx-auto mb-5">
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Register your client / admin
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter the information below to register you client!
            </p>
          </div>
          <div>
            <form onSubmit={submitHandler}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>
                      Client / Admin Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your client / admin name"
                      required
                      value={user.username}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Phone number<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Enter your client / admin phone"
                      required
                      value={user.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label>
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your client / admin email"
                      required
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label>
                      Password<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        placeholder="Enter your client / admin password"
                        type={showPassword ? "text" : "password"}
                        required
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        minLength={8}
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
                    <Label>User side</Label>
                    <Select options={[
                      { value: 'admin', label: 'admin' },
                      { value: 'client', label: 'client' }
                    ]}
                      defaultValue="client"
                      onChange={(value) => {
                        setUser(prev => ({ ...prev, isAdmin: value === 'admin' }))
                      }}
                    />
                  </div>
                  {user.isAdmin && <div>
                    <Label>Role <span className="text-error-500">*</span></Label>
                    <Select options={[
                      { value: 'super', label: 'Super admin' },
                      { value: 'sub-super', label: 'Sub Super admin' },
                      { value: 'manager', label: 'Order Manager' },
                      // { value: 'reader', label: 'Reader' },
                    ]}
                      onChange={(value) => {
                        setUser(prev => ({ ...prev, role: value }))
                      }}
                      required={true}
                    />
                  </div>}
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
