"use client";

import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { motion, Variants } from "framer-motion";
import { MoveLeft } from "lucide-react";
type googleDataType = {
  email: string;
  name: string;
  password: string;

  shop_id?: string;
  sub?: string;
  picture?: string;
  isOwner?: boolean;
};

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
  const [values, setvalues] = useState<{
    email: string;
    name: string;
    password: string;
  }>({
    name: openRegesterForm.prevData.name,
    email: openRegesterForm.prevData.email,
    password: openRegesterForm.prevData.password,
  });

  const handleCompleteSignin = useCallback((payload: googleDataType) => {
    console.log(`%c payload `, "color: orange;border:2px solid cyan", payload);
  }, []);

  const onSubmit = useCallback(
    (
      e?: React.SyntheticEvent | any,
      authObj?: any,
      isGoogleLogin: boolean = false
    ) => {
      if (e) e.preventDefault();
      // setIsLoading(true);,

      let googleLoginData: googleDataType = {
        name: "",
        email: "",
        password: "",
      };

      if (isGoogleLogin) {
        const decodedata: googleDataType = jwtDecode(authObj.credential);
        googleLoginData.password = decodedata.sub || "";
        googleLoginData.name = decodedata.name;
        googleLoginData.email = decodedata.email;
        googleLoginData.picture = decodedata.picture;
      } else {
        googleLoginData = {
          email: values.email,
          password: values.password,
          name: values.name,
        };
        setvalues(googleLoginData);
      }

      if (isRegistration) {
        setopenRegesterForm({
          shopValues: { name: "", desc: "" },
          prevData: googleLoginData,
          step: 1,
        });
        return;
      }

      handleCompleteSignin(googleLoginData);

      //further login steps
    },
    [
      handleCompleteSignin,
      isRegistration,
      values.email,
      values.name,
      values.password,
    ]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setvalues((p) => ({ ...p, [e.target.name]: e.target.value }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="Login-form-wrapper h-screen w-screen justify-center flex items-center"
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
          <h2 className="text-center underline capitalize">
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
            <motion.form
              onSubmit={onSubmit}
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
                    <Input
                      name="name"
                      id="name"
                      value={values.name}
                      placeholder="Enter your name"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="grid gap-2 my-2">
                  <Label className="not-sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    name="email"
                    id="email"
                    value={values.email}
                    placeholder="name@example.com"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2 my-2">
                  <Label className="not-sr-only" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    placeholder="Password"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </div>
                <Button variant={"stylish"} disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isRegistration
                    ? "Enter restraunt Details"
                    : isSignupForm
                    ? "SignUp"
                    : "Login"}
                  <BottomGradient />
                </Button>
              </div>
            </motion.form>
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
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                onSubmit(null, credentialResponse, true);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </>
        )}
        {/* SHOP REGESTER FORM  */}
        {openRegesterForm.step === 1 && (
          <ShopRegesterForm
            isLoading={isLoading}
            setopenRegesterForm={setopenRegesterForm}
            openRegesterForm={openRegesterForm}
          />
        )}
      </div>
    </motion.div>
  );
}
type ShopRegesterFormTypes = {
  isLoading: boolean;
  setopenRegesterForm: Dispatch<
    SetStateAction<{
      prevData: { name: string; email: string; password: string };
      shopValues: { name: string; desc: string };
      step: number;
    }>
  >;
  openRegesterForm: {
    prevData: { name: string; email: string; password: string };
    shopValues: { name: string; desc: string };
    step: number;
  };
};

const ShopRegesterForm = ({
  isLoading,
  openRegesterForm,
  setopenRegesterForm,
}: ShopRegesterFormTypes) => {
  // REGESTER SHOP
  function onSubmitShop(e: React.SyntheticEvent) {
    if (e) e.preventDefault();
    const finalvalues = openRegesterForm;
    console.log(
      `%c finalvalues `,
      "color: yellow;border:1px solid lightgreen",
      finalvalues
    );
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
          <Label className="not-sr-only" htmlFor="shop-name">
            Shop name
          </Label>
          <Input
            value={openRegesterForm.shopValues.name}
            onChange={(e) =>
              setopenRegesterForm((prev) => ({
                ...prev,
                shopValues: { ...prev.shopValues, name: e.target.value },
              }))
            }
            name="shop-name"
            id="shop-name"
            placeholder="Enter shop name"
            type="text"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2 my-2">
          <Label className="not-sr-only" htmlFor="shop-desc">
            Shop description
          </Label>
          <Input
            onChange={(e) =>
              setopenRegesterForm((prev) => ({
                ...prev,
                shopValues: { ...prev.shopValues, desc: e.target.value },
              }))
            }
            value={openRegesterForm.shopValues.desc}
            name="shop-desc"
            id="shop-desc"
            placeholder="Shop description"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
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
