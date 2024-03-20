"use client";

import React, { useEffect, useState } from "react";
import StepperForm from "@/components/StepperForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { Check, Edit, PlusCircle } from "lucide-react";
import Image from "next/image";
// import { v4 as uuidv4 } from "uuid";

export type FirstStepType = {
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
  const { shop, isAuthenticated } = useStore();
  const router = useRouter();
  const [currentStep, setcurrentStep] = useState<number>(
    shop.regestrationStep || 0
  );
  useEffect(() => {
    // if (!isAuthenticated) router.push("/");
    setcurrentStep(shop.regestrationStep || 0);
  }, [isAuthenticated, router, shop.regestrationStep]);

  const steps = [
    <FirstStep key={1} step={1} />,
    <SecondStep key={2} step={2} />,
    <ThirdStep key={3} step={3} />,
  ];

  return (
    <StepperForm
      steps={steps}
      currentStep={currentStep}
      setcurrentStep={setcurrentStep}
    />
  );
};

const FirstStep = ({}: { step: number }) => {
  const { user, shop, dynamicShopUpdate } = useStore();

  const form = useForm<FirstStepType>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: shop.name,
      desc: shop.desc,
      phone: shop.phone,
      tel: shop.tel,
      address: shop?.address || {},
    },
  });

  const [coords, setCoords] = useState<[number, number]>([
    user.address?.lat || 28.344867438128745,
    user.address?.lon || 79.42556179428163,
  ]);

  async function onSubmit(payload: any) {
    // form.formState.isLoading = true;
    await dynamicShopUpdate(payload);
    // form.formState.isLoading = false;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pb-2 pt-10">
        <div className="first flex flex-col gap-4 p-2">
          <h1 className="opacity-70 text-center text-2xl">
            Restraunt information
          </h1>
          <Accordion type="multiple">
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
                    type="text"
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
                  placeholder="Phone number"
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

type menuType = {
  name: string;
  desc: string;
  price: number;
  type: "veg" | "non veg" | "egg" | unknown;
  picture: string;
};
const foofType = [
  { type: "veg", color: "green" },
  { type: "non veg", color: "red" },
  { type: "egg", color: "orange" },
];
type secondStepType = {
  name: string;
  menu: menuType[];
};
const initialMenu = {
  desc: "",
  name: "",
  picture: "",
  price: 0,
  type: "",
};
const SecondStep = ({}: { step: number }) => {
  const [categoriesList, setCategoriesList] = useState<
    { _id?: string; name: string; isEditable?: boolean; menu: menuType[] }[]
  >([]);
  const form = useForm<secondStepType>({
    defaultValues: { name: "", menu: [initialMenu] },
  });

  let values = form.getValues();

  console.log(`%c values `, "color: green;border:1px solid green", values);
  console.log(
    `%c categoriesList `,
    "color: pink;border:1px solid pink",
    categoriesList
  );

  function onSubmit(e: any) {
    console.log(`%c e `, "color: red;border:2px dotted red", e);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="first flex flex-col gap-4"
      >
        <h1 className="opacity-70 text-center text-2xl">
          Menu, Prices, Food images
        </h1>
        <div className="main-content border-2">
          <Accordion type="multiple" className="p-2">
            <AccordionItem value="second-1" className="mt-5 mb-2">
              <AccordionTrigger className="p-4">
                <div className="flex flex-row gap-2 items-center opacity-50">
                  <PlusCircle size={20} />
                  <h1 className="text-start text-xl">Add new Category</h1>
                </div>
              </AccordionTrigger>
              <AccordionContent className="gap-2 flex flex-col p-4">
                <FormLabel>Category name</FormLabel>
                <Input
                  placeholder="Enter category name"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  {...form.register("name")}
                />
                <FormErrorLabel path="phone" />
                <FormLabel className="mt-4">Category items</FormLabel>
                <Button
                  variant="outline"
                  className="self-start"
                  onClick={() => {
                    form.setValue(
                      `menu.${form.getValues().menu.length}`,
                      initialMenu
                    );
                  }}
                >
                  <div className="flex flex-row gap-2 items-center opacity-50">
                    <PlusCircle size={16} />
                    <h1 className="text-start">Add Item</h1>
                  </div>
                </Button>
                {values.menu.map((menu, i) => {
                  return (
                    <div
                      className="menu-div flex flex-row border-2 p-2 gap-2"
                      key={menu.name}
                    >
                      <div className="menu-image w-1/4">
                        {menu.picture ? (
                          <Image alt="meny image" src={menu.picture} />
                        ) : (
                          <Button
                            variant="outline"
                            type="button"
                            className="flex-grow h-full w-full gap-2 flex- flex-col"
                          >
                            <PlusCircle className="opacity-10" size={30} />
                            <h1 className="opacity-10">Upload Picture</h1>
                          </Button>
                        )}
                      </div>
                      <div className=" flex flex-col gap-2">
                        <div className="menu-info flex flex-row gap-1">
                          <Input
                            placeholder="Enter Item name"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            {...form.register(`menu.${i}.name`)}
                          />
                          <FormErrorLabel path={`menu.${i}.name`} />
                          <Input
                            placeholder="Enter Item price"
                            type="number"
                            autoCapitalize="none"
                            autoCorrect="off"
                            {...form.register(`menu.${i}.price`)}
                          />
                          <FormErrorLabel path={`menu.${i}.price`} />
                        </div>

                        <div className="menu-info flex flex-row gap-1">
                          <Input
                            placeholder="Enter Item description"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            {...form.register(`menu.${i}.desc`)}
                          />
                          <FormErrorLabel path={`menu.${i}.name`} />
                          {/* // <div className="bg-[green]-300 bg-[red]-300 bg-[orange]-300"></div> */}
                          {foofType.map(({ type, color }) => (
                            <Button
                              onClick={() => {
                                form.setValue(`menu.${i}.type`, type);
                              }}
                              variant="outline"
                              key={type}
                              type="button"
                              className="capitalize flex flex-row gap-1 bg-"
                            >
                              <div
                                className={`border-[1px] border-${color}-500 rounded-sm p-[2px]`}
                              >
                                <div
                                  className={`h-2 w-2 rounded-full bg-${color}-500`}
                                />
                              </div>
                              {type}
                            </Button>
                          ))}

                          <FormErrorLabel path={`menu.${i}.price`} />
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Button
                  type="button"
                  variant="outline"
                  className="self-end"
                  onClick={() => {
                    setCategoriesList((prev) => {
                      return [
                        ...prev,
                        { name: values.name, menu: values.menu },
                      ];
                    });
                  }}
                >
                  <div className="flex flex-row gap-2 items-center opacity-50">
                    <Check size={16} />
                    <h1 className="text-start">Save Categoty</h1>
                  </div>
                </Button>
              </AccordionContent>
            </AccordionItem>

            {categoriesList.map((category, i) => {
              return (
                <AccordionItem
                  key={category.name}
                  value={category.name + i}
                  className="mt-5 mb-2"
                >
                  <AccordionTrigger className="p-4">
                    {category.isEditable ? (
                      <></>
                    ) : (
                      <div className="category-item" key={category.name}>
                        {category.name}
                      </div>
                    )}
                    {category.isEditable ? (
                      <Button variant="outline">
                        <Check size={20} />
                        <Check size={20} />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCategoriesList((prev) => [...prev]);
                        }}
                      >
                        <Edit size={20} />
                      </Button>
                    )}
                  </AccordionTrigger>
                  <AccordionContent></AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
        <Button>Save</Button>
      </form>
    </Form>
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
