"use client";

import React, { useEffect } from "react";
import StepperForm from "./StepperForm";

type validationType = {
  name: string;
  desc: string;
  address?: {
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
};
const zodSchema = z.object({});
const ManageRestraunt = () => {
  const form = useForm<validationType>({
    resolver: zodResolver(zodSchema),
  });
  useEffect(() => {
    console.log("form=>>>>>>>>>>>>>", form.getValues());
  }, [form]);

  const steps = [
    <FirstStep key={1} form={form} />,
    <SecondStep key={2} form={form} />,
    <ThirdStep key={3} form={form} />,
  ];

  function onSubmit(e: any) {
    console.log(e);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pb-20 pt-10">
        <StepperForm steps={steps} startFrom={0} />
      </form>
    </Form>
  );
};
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GmapAutoComplete from "@/components/GmapAutoComplete";
type formType = UseFormReturn<validationType, any, undefined>;
const FirstStep = ({ form }: { form: formType }) => {
  return (
    <div className="first flex flex-col gap-4 p-4">
      <h1 className="opacity-70 text-center text-2xl">Restraunt information</h1>
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-start text-2xl">Restaurant details</h1>
              <h1 className="text-start text-xl">Name, address and location</h1>
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
            <FormLabel className="not-sr-only" htmlFor="desc">
              Complete address
            </FormLabel>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        name="address.country"
                        placeholder="Country"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value?.country}
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        name="address.city"
                        placeholder="City"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value?.city}
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        name="address.postcode"
                        placeholder="Postcode"
                        type="number"
                        autoCapitalize="none"
                        autoCorrect="off"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value?.postcode}
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        name="address.state"
                        placeholder="state"
                        type="text"
                        autoCapitalize="none"
                        autoCorrect="off"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value?.state}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <GmapAutoComplete
              onSave={(e: any) => {
                form.setValue("address", e.address);
                console.log(e);
              }}
              returnCompleteAddress={true}
            />
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
