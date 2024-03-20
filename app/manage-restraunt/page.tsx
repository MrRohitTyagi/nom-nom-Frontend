"use client";

import React, { useEffect, useState } from "react";
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
import MapComp from "@/components/MapComponent";
import { useStore } from "@/utils/store";
import { Button } from "@/components/ui/button";

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
    display_name?: string;
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
    display_name: z.string().min(1, { message: "Street in required" }),
  }),
});

const ManageRestraunt = () => {
  const steps = [
    <FirstStep key={1} step={1} />,
    <SecondStep key={2} step={2} />,
    <ThirdStep key={3} step={3} />,
  ];

  return <StepperForm steps={steps} startFrom={0} />;
};

type formType = UseFormReturn<validationType, any, undefined>;

const FirstStep = ({}: { step: number }) => {
  const { user, shop } = useStore();

  const form = useForm<validationType>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: shop.name,
      desc: shop.desc,
      phone: shop.phone,
      tel: shop.tel,
      address: shop?.address || {},
    },
  });
  useEffect(() => {
    console.log("form.formState", form.formState.defaultValues);
  });
  const [coords, setCoords] = useState<[number, number]>([
    user.address?.lat || 28.344867438128745,
    user.address?.lon || 79.42556179428163,
  ]);

  console.log(`%c {user,shop} `, "color: red;border:2px dotted red", {
    user,
    shop,
  });

  function onSubmit(e: any) {
    console.log(`%c e `, "color: yellow;border:1px solid lightgreen", e);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pb-2 pt-10">
        <div className="first flex flex-col gap-4 p-2">
          <h1 className="opacity-70 text-center text-2xl">
            Restraunt information
          </h1>
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
                <FormControl>
                  <Input
                    placeholder="Street"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    {...form.register("address.display_name")}
                  />
                </FormControl>
                <FormErrorLabel path="address.display_name" />
                <GmapAutoComplete
                  onSave={(e: any) => {
                    form.setValue("address", e.address);
                    form.setFocus("address", {});
                    form.setError("address", {});
                    console.log(e);

                    setCoords([e.lat, e.lon]);
                  }}
                  returnCompleteAddress={true}
                />
                <MapComp setCoords={setCoords} coords={coords} />
              </AccordionContent>
            </AccordionItem>

            {/* -----------------------------------------------------------------------2nd accordian ito */}

            <AccordionItem value="item-2" className="mt-5 mb-2">
              <AccordionTrigger className="p-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-start text-2xl">Restaurant Contacts</h1>
                  <h1 className="text-start text-sm opacity-50">
                    Your customers will call on this number for general
                    enquiries
                  </h1>
                </div>
              </AccordionTrigger>

              <AccordionContent className="gap-2 flex flex-col p-4">
                <Input
                  placeholder="Nhone number"
                  type="number"
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...form.register("phone")}
                />
                <FormErrorLabel path="phone" />
                <Input
                  placeholder="Landline number"
                  type="number"
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...form.register("tel")}
                />
                <FormErrorLabel path="tel" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
};
const SecondStep = ({}: { step: number }) => {
  return (
    <div className="first flex flex-col gap-4">
      <h1 className="opacity-70 text-center text-2xl">
        Menu, Prices, Food images
      </h1>
      <div className="main-content"></div>
    </div>
  );
};
const ThirdStep = ({}: { step: number }) => {
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
