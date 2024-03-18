"use client";

import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { motion, Variants } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { ArrowRight, MoveLeft } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login, signup } from "@/gateways/authGateway";

import { cn } from "@/lib/utils";
import { useAuthStore, userType } from "@/utils/store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, useForm } from "react-hook-form";
import { getSchema } from "./utils";

interface LoginProps extends React.HTMLAttributes<HTMLDivElement> {}
interface LoginProps extends Object {
  isSignupForm: boolean;
  isRegistration: boolean;
}
const formAnimationVarient: Variants = {
  initial: { x: 300 },
  animate: { x: 0, transition: { duration: 0.2, type: "tween" } },
};

//COMPOENNT

function Login({ className, ...props }: LoginProps) {
  const { isSignupForm = false, isRegistration = false } = props;

  const zodSchema = getSchema(isSignupForm, isRegistration);
  const router = useRouter();
  const { setAuthStatus } = useAuthStore();
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openRegesterForm, setopenRegesterForm] = useState<{
    prevData: { name: string; email: string; password: string };
    shopValues: { name: string; desc: string };
    step: number;
  }>({
    prevData: { name: "", email: "", password: "" },
    step: 0,
    shopValues: { name: "", desc: "" },
  });

  const handleCompleteSignin = useCallback(
    async (payload: userType) => {
      switch (true) {
        case isSignupForm:
          {
            const user = await signup(payload);
            setAuthStatus(user);
          }
          return;

        default:
          {
            const user = await login(payload);
            setAuthStatus(user);
          }
          return;
      }
    },
    [isSignupForm, setAuthStatus]
  );

  const onSubmit = useCallback(
    async (
      e?: React.SyntheticEvent | any,
      authObj?: any,
      isGoogleLogin: boolean = false
    ) => {
      // if (e) e.preventDefault();
      const formValues = form.getValues();
      console.log("formvalues", formValues);
      try {
        setIsLoading(true);

        let loginData: userType = {
          name: "",
          email: "",
          password: "",
          picture: "",
        };

        if (isGoogleLogin) {
          const decodedata: userType = jwtDecode(authObj.credential);
          loginData.password = decodedata.sub || "";
          loginData.name = decodedata.name;
          loginData.email = decodedata.email;
          loginData.picture = decodedata.picture;
        } else {
          loginData = {
            email: formValues.email,
            password: formValues.password,
            name: formValues.name,
          };
          // setvalues(loginData);
        }

        if (isRegistration) {
          setopenRegesterForm({
            shopValues: { name: "", desc: "" },
            prevData: loginData,
            step: 1,
          });
          setIsLoading(false);
          return;
        }
        return;
        await handleCompleteSignin(loginData);
        setIsLoading(false);
        // router.push("/");
      } catch (error) {
        console.log(error);
      }
      //further login steps
    },
    [form, handleCompleteSignin, isRegistration]
  );

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="Login-form-wrapper mt-[10vh] justify-center flex items-center"
      >
        <div
          className={cn(
            "grid gap-6 border-2 border-gray-300 rounded-xl px-10 py-5 overflow-hidden max-w-[20rem]",
            className
          )}
          {...props}
        >
          <div className="heading flex flex-row justify-between">
            {openRegesterForm.step === 1 ? (
              <button
                onClick={() => {
                  setopenRegesterForm((p) => ({ ...p, step: 0 }));
                }}
              >
                <MoveLeft size={24} color="black" />
              </button>
            ) : (
              <div></div>
            )}
            <h2 className="text-center capitalize">
              {isRegistration
                ? openRegesterForm.step === 0
                  ? "Owner Details"
                  : "Restraunt Details"
                : isSignupForm
                ? "SignUp"
                : "Login"}
            </h2>
            <div></div>
          </div>
          {openRegesterForm.step === 0 && (
            <>
              <motion.div
                initial="initial"
                animate="animate"
                variants={formAnimationVarient}
              >
                <div className="grid gap-2">
                  {isSignupForm && (
                    <div className="grid gap-2 my-2">
                      <Label className="not-sr-only" htmlFor="name">
                        Name
                      </Label>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormControl>
                                <Input
                                  name="name"
                                  id="name"
                                  placeholder="Enter your name"
                                  type="text"
                                  autoCapitalize="none"
                                  autoComplete="email"
                                  autoCorrect="off"
                                  disabled={isLoading}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  value={field.value}

                                  // value={values.name}
                                  // onChange={handleChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      ></FormField>
                    </div>
                  )}

                  <div className="grid gap-2 my-2">
                    <Label className="not-sr-only" htmlFor="email">
                      Email
                    </Label>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                name="email"
                                id="email"
                                placeholder="name@example.com"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="grid gap-2 my-2">
                    <Label className="not-sr-only" htmlFor="password">
                      Password
                    </Label>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                name="password"
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                                id="password"
                                placeholder="Password"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <Button
                    variant={"stylish"}
                    disabled={isLoading}
                    className="flex items-center"
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isRegistration ? (
                      <div className="flex items-center gap-1">
                        Enter restraunt Details <ArrowRight size={20} />
                      </div>
                    ) : isSignupForm ? (
                      "SignUp"
                    ) : (
                      "Login"
                    )}
                    <BottomGradient />
                  </Button>
                </div>
              </motion.div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div
                style={
                  isLoading ? { pointerEvents: "none", opacity: "50%" } : {}
                }
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    onSubmit(null, credentialResponse, true);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </>
          )}
          {/* SHOP REGESTER FORM  */}
          {openRegesterForm.step === 1 && (
            <ShopRegesterForm
              form={form}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      </motion.form>
    </Form>
  );
}
type ShopRegesterFormTypes = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      email: string;
      shop_name?: string;
      shop_desc?: string;
      password: string;
      name: string;
    },
    any,
    undefined
  >;
};

const ShopRegesterForm = ({
  isLoading,
  form,
  setIsLoading,
}: ShopRegesterFormTypes) => {
  // REGESTER SHOP
  function onSubmitShop(e: React.SyntheticEvent) {
    setIsLoading(true);
    if (e) e.preventDefault();
    const finalvalues = form.getValues();
    console.log(
      `%c finalvalues ShopRegesterForm`,
      "color: yellow;border:1px solid lightgreen",
      finalvalues
    );
    setIsLoading(false);
  }
  return (
    <motion.form
      initial="initial"
      animate="animate"
      variants={formAnimationVarient}
      onSubmit={onSubmitShop}
    >
      {/* <h2 className="text-center">{isSignupForm ? "SignUp" : "Login"}</h2> */}
      <div className="grid gap-2">
        <div className="grid gap-2 my-2">
          <Label className="not-sr-only" htmlFor="shop_name">
            Shop name
          </Label>
          <FormField
            control={form.control}
            name="shop_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      name="shop_name"
                      id="shop_name"
                      placeholder="Enter shop name"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="grid gap-2 my-2">
          <Label className="not-sr-only" htmlFor="shop_desc">
            Shop description
          </Label>
          <FormField
            control={form.control}
            name="shop_desc"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      name="shop_desc"
                      id="shop_desc"
                      placeholder="Shop description"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <Button variant={"stylish"} disabled={isLoading}>
          Regester
          <BottomGradient />
        </Button>
        <h6 className="text-1xl">
          Go to restraunt pannel after regesteration to complete the restraunt
          setup
        </h6>
      </div>
    </motion.form>
  );
};
export default Login;
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-white to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
    </>
  );
};
