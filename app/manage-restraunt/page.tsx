"use client";

import React, { useEffect } from "react";
import StepperForm from "./StepperForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormErrorLabel,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GmapAutoComplete from "@/components/GmapAutoComplete";

type validationType = {
  name: string;
  desc: string;
  phone: string;
  tel: string;
  address?: {
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
};
const zodSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name too short" })
    .max(20, { message: "Name too Long" }),
  desc: z.string(),
  phone: z
    .string()
    .min(10, { message: "Invalid Number" })
    .max(10, { message: "Invalid Number" }),
  tel: z
    .string()
    .min(10, { message: "Invalid Number" })
    .max(10, { message: "Invalid Number" }),
  address: z.object({
    city: z.string().min(1, { message: "city in required" }),
    state: z.string().min(1, { message: "state in required" }),
    postcode: z.string().min(1, { message: "postcode in required" }),
    country: z.string().min(1, { message: "country in required" }),
  }),
});

const ManageRestraunt = () => {
  const form = useForm<validationType>({ resolver: zodResolver(zodSchema) });

  const steps = [
    <FirstStep key={1} form={form} />,
    <SecondStep key={2} form={form} />,
    <ThirdStep key={3} form={form} />,
  ];

  function onSubmit(e: any) {
    form.formState.errors;
    console.log(
      `%c eonSubmit `,
      "color: white;border:3px solid white;margin:5px",
      { e, errors: form.formState.errors }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pb-20 pt-10">
        <StepperForm steps={steps} startFrom={0} />
      </form>
    </Form>
  );
};

type formType = UseFormReturn<validationType, any, undefined>;
const FirstStep = ({ form }: { form: formType }) => {
  const errors = form.formState.errors;
  console.log(
    `%c err `,
    "color: red;border:3px solid white;margin:5px",
    errors
  );
  return (
    <div className="first flex flex-col gap-4 p-4">
      <h1 className="opacity-70 text-center text-2xl">Restraunt information</h1>
      <Accordion type="single">
        <AccordionItem value="item-1" className="mt-5 mb-2">
          <AccordionTrigger className="p-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-start text-2xl">Restaurant details</h1>
              <h1 className="text-start text-sm opacity-50">
                Name, address and location
              </h1>
            </div>
          </AccordionTrigger>
          <AccordionContent className="gap-2 flex flex-col p-4">
            {/* // Name */}
            <FormLabel className="not-sr-only" htmlFor="name">
              Restraunt name
            </FormLabel>
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
                        placeholder="Restraunt name"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="name"
                        autoCorrect="off"
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
            <FormLabel className="not-sr-only" htmlFor="desc">
              Restraunt description
            </FormLabel>
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        name="desc"
                        id="desc"
                        placeholder="Restraunt description"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
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
            <FormLabel className="not-sr-only" htmlFor="address">
              Complete address
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Country"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                {...form.register("address.country")}
              />
            </FormControl>
            <FormErrorLabel path="address.country" />
            <FormControl>
              <Input
                placeholder="City"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                {...form.register("address.city")}
              />
            </FormControl>
            <FormErrorLabel path="address.city" />
            <FormControl>
              <Input
                placeholder="Postcode"
                type="number"
                autoCapitalize="none"
                autoCorrect="off"
                {...form.register("address.postcode")}
              />
            </FormControl>
            <FormErrorLabel path="address.postcode" />
            <FormControl>
              <Input
                placeholder="state"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                {...form.register("address.state")}
              />
            </FormControl>
            <FormErrorLabel path="address.state" />
            <GmapAutoComplete
              onSave={(e: any) => {
                form.setValue("address", e.address);
                console.log(e);
              }}
              returnCompleteAddress={true}
            />
          </AccordionContent>
        </AccordionItem>

        {/* -----------------------------------------------------------------------2nd accordian ito */}

        <AccordionItem value="item-2" className="mt-5 mb-2">
          <AccordionTrigger className="p-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-start text-2xl">Restaurant Contacts</h1>
              <h1 className="text-start text-sm opacity-50">
                Your customers will call on this number for general enquiries
              </h1>
            </div>
          </AccordionTrigger>

          <AccordionContent className="gap-2 flex flex-col p-4">
            <Input
              placeholder="123456789"
              type="number"
              autoCapitalize="none"
              autoCorrect="off"
              {...form.register("phone")}
            />
            <FormErrorLabel path="phone" />
            <Input
              placeholder="123456789"
              type="number"
              autoCapitalize="none"
              autoCorrect="off"
              {...form.register("tel")}
            />
            <FormErrorLabel path="tel" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
const SecondStep = ({ form }: { form: formType }) => {
  return (
    <div className="first flex flex-col gap-4">
      <h1 className="opacity-70 text-center text-2xl">
        Menu, Prices, Food images
      </h1>
      <div className="main-content"></div>
    </div>
  );
};
const ThirdStep = ({ form }: { form: formType }) => {
  return (
    <div className="first flex flex-col gap-4">
      <h1 className="opacity-70 text-center text-2xl">
        Additional Information
      </h1>
      <div className="main-content"></div>
    </div>
  );
};

export default ManageRestraunt;