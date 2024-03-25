"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import { Check, Edit, PlusCircle, X } from "lucide-react";
import Image from "next/image";
import { v4 as uuid } from "uuid";

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
                  {...form.register("phone")}
                />
                <FormErrorLabel path="phone" />
                <Input
                  placeholder="Landline number"
                  type="number"
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

type vegNonVegOptionType = "veg" | "non veg" | "egg";
type menuType = {
  _id: string;
  item_name: string;
  desc: string;
  price: number | string;
  type: vegNonVegOptionType;
  picture?: string | File;
};
type foodTypeVegNonVegType = {
  type: vegNonVegOptionType;
  color: "green" | "red" | "orange";
};

const foodTypeVegNonVeg: foodTypeVegNonVegType[] = [
  { type: "veg", color: "green" },
  { type: "non veg", color: "red" },
  { type: "egg", color: "orange" },
];
export type secondStepType = {
  isEditable?: boolean;
  _id: string;
  name: string;
  menu: menuType[];
};
const initialMenu: menuType = {
  _id: "",
  desc: "",
  item_name: "",
  picture: "",
  price: "0",
  type: "veg",
};
const secondStepZodValidation = z.object({
  name: z.string().min(3, "Name too short").max(20, "Name too long"),
  menu: z.array(
    z.object({
      item_name: z.string().min(3, "Name too short").max(20, "Name too long"),
      desc: z
        .string()
        .min(3, "Description too short")
        .max(20, "Description too long"),
      price: z.string().min(1, "Price is required"),
      type: z.string().min(1, "Type is required"),
    })
  ),
});

const SecondStep = ({}: { step: number }) => {
  const { dynamicShopUpdate, shop } = useStore();
  const [selectefvegNonVegOptionType, setselectefvegNonVegOptionType] =
    useState<vegNonVegOptionType>("veg");
  const [selectedPicture, setselectedPicture] = useState<File | undefined>(
    undefined
  );
  const [categoriesList, setCategoriesList] = useState<secondStepType[]>([]);

  const form = useForm<secondStepType>({
    resolver: zodResolver(secondStepZodValidation),
    defaultValues: { name: "", menu: [initialMenu] },
  });
  useEffect(() => setCategoriesList(shop?.categories || []), [shop.categories]);

  const values = form.getValues();

  console.log(`%c values `, "color: green;border:1px solid green", values);
  console.log(
    `%c categoriesList `,
    "color: pink;border:1px solid pink",
    categoriesList
  );

  function onSubmit(e: secondStepType) {
    console.log(`%c e `, "color: red;border:2px dotted red", e);
    setCategoriesList((prev) => {
      return [
        ...prev,
        {
          name: e.name,
          menu: e.menu.map((e) => ({
            ...e,
            _id: uuid(),
            picture: selectedPicture,
          })),
          _id: uuid(),
        },
      ];
    });
    form.reset();
  }

  const handleStep2finalsave = async () => {
    console.log(
      `%c categories `,
      "color: white;border:3px solid white;margin:5px",
      categoriesList
    );
    await dynamicShopUpdate({ categories: categoriesList });
  };

  const handleEditCategory = useCallback(
    (_id: string, keyToChange: string, value: any) => {
      setCategoriesList((prev) => {
        return prev.map((ele) => {
          if (ele._id === _id) {
            return { ...ele, [keyToChange]: value };
          } else return ele;
        });
      });
    },
    []
  );

  const updateMenuOnChange = useCallback(
    (_id: string, menu: menuType[], menu_id: string, key: any, value: any) => {
      handleEditCategory(
        _id,
        "menu",
        menu.map((m) => {
          if (m._id === menu_id) {
            return {
              ...m,
              [key]: value,
            };
          } else return m;
        })
      );
    },
    [handleEditCategory]
  );

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
            <div className="accordian-number flex flex-row gap-2 items-center">
              <h1>1</h1>
              <AccordionItem value="second-1" className="mt-5 mb-2 w-full">
                <AccordionTrigger className="p-4">
                  <div className="flex flex-row gap-2 items-center ">
                    <PlusCircle size={20} />
                    <h1 className="text-start even:opacity-50">
                      Add new Category
                    </h1>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="gap-2 flex flex-col p-4">
                  {/*  */}
                  <FormLabel>Category name</FormLabel>
                  <Input
                    placeholder="Enter category name"
                    type="text"
                    {...form.register("name")}
                  />
                  <FormErrorLabel path="name" />

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
                        className="menu-div flex flex-col lg:flex-row border-2 p-2 gap-2"
                        key={menu._id}
                      >
                        <div className="menu-image w-32 min-h-32">
                          <Button
                            variant="outline"
                            type="button"
                            className="flex-grow h-full w-full relative"
                            onClick={() => {
                              const inp = document.getElementById(
                                `input-${menu._id}`
                              );
                              if (inp) inp.click();
                            }}
                          >
                            {selectedPicture && (
                              <div className="close-button absolute top-0 right-0">
                                <Button
                                  className="p-0.5 size-fit"
                                  variant="default"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setselectedPicture(undefined);
                                    form.setValue(
                                      `menu.${i}.picture`,
                                      undefined
                                    );
                                  }}
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                            )}
                            <Input
                              id={`input-${menu._id}`}
                              type="file"
                              className={`hidden absolute top-[1000px]`}
                              // {...form.register(`menu.${i}.item_name`)}
                              onChange={(e) => {
                                if (e?.target?.files?.[0]) {
                                  setselectedPicture(e?.target?.files?.[0]);
                                  form.setValue(
                                    `menu.${i}.picture`,
                                    e.target.files[0]
                                  );
                                }
                              }}
                            />
                            {menu.picture ? (
                              <Image
                                height={50}
                                width={50}
                                className="object-contain size-full max-h-[60px]"
                                alt="menu image"
                                src={
                                  selectedPicture
                                    ? URL.createObjectURL(selectedPicture)
                                    : typeof menu.picture === "string"
                                    ? menu.picture
                                    : URL.createObjectURL(menu.picture)
                                }
                              />
                            ) : (
                              <div className="flex flex-col gap-2 justify-center items-center">
                                <PlusCircle className="opacity-10" size={25} />
                                <h1 className="opacity-50">Upload Picture</h1>
                              </div>
                            )}
                          </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="menu-info flex flex-col lg:flex-row xl:flex-row gap-1">
                            <div className="menu-info flex flex-col gap-1">
                              <Input
                                placeholder="Enter Item name"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                {...form.register(`menu.${i}.item_name`)}
                              />
                              <FormErrorLabel path={`menu.${i}.item_name`} />
                            </div>

                            <div className="menu-info flex flex-col gap-1">
                              <Input
                                placeholder="Enter Item description"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                {...form.register(`menu.${i}.desc`)}
                              />
                              <FormErrorLabel path={`menu.${i}.desc`} />
                            </div>
                          </div>

                          <div className="menu-info flex flex-row gap-1">
                            <div className="menu-info flex flex-col gap-1">
                              <Input
                                placeholder="Price"
                                type="number"
                                {...form.register(`menu.${i}.price`)}
                              />
                              <FormErrorLabel path={`menu.${i}.price`} />
                            </div>

                            {/* // <div className="bg-[green]-300 bg-[red]-300 bg-[orange]-300"></div> */}

                            <div className="menu-info flex flex-col gap-1">
                              <div className="menu-info flex flex-row gap-1">
                                {foodTypeVegNonVeg.map(
                                  ({ type, color }, index) => (
                                    <Button
                                      onClick={() => {
                                        form.setValue(`menu.${i}.type`, type);
                                        setselectefvegNonVegOptionType(type);
                                      }}
                                      variant={
                                        selectefvegNonVegOptionType === type
                                          ? "selected"
                                          : "outline"
                                      }
                                      key={type + index}
                                      type="button"
                                      className="capitalize flex flex-row gap-1 mt-0.5"
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
                                  )
                                )}
                              </div>
                              <FormErrorLabel path={`menu.${i}.type`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* //save cateroy button  */}

                  <Button variant="outline" className="self-end">
                    <div className="flex flex-row gap-2 items-center opacity-50">
                      <Check size={16} />
                      <h1 className="text-start">Save Categoty</h1>
                    </div>
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </div>

            {/* //edit category componnet  ----------------------------------------------------------------------*/}
            {categoriesList.map(({ _id, isEditable, ...category }, i) => {
              return (
                <div
                  key={_id}
                  className="accordian-number flex flex-row gap-2 items-center"
                >
                  <h1>{i + 2}</h1>
                  <AccordionItem
                    value={category.name + i}
                    className="mt-5 mb-2 w-full"
                  >
                    <AccordionTrigger className="p-4">
                      <div className="flex flex-row gap-2 items-center">
                        {isEditable ? (
                          <h1 className="underline category-item min-w-24 max-w-24 text-ellipsis">
                            Editing
                          </h1>
                        ) : (
                          <div className="opacity-50 category-item min-w-24 max-w-24 text-ellipsis capitalize">
                            {category.name}
                          </div>
                        )}

                        {isEditable ? (
                          <Button
                            type="button"
                            variant="simple"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleEditCategory(_id, "isEditable", false);
                            }}
                          >
                            <Check size={18} color="black" />
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="simple"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleEditCategory(_id, "isEditable", true);
                            }}
                          >
                            <Edit size={18} color="black" />
                          </Button>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="gap-2 flex flex-col p-4">
                      <div>
                        <FormLabel>Category name</FormLabel>
                        <Input
                          disabled={!isEditable}
                          value={category.name}
                          onChange={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleEditCategory(_id, "name", e.target.value);
                          }}
                        />
                      </div>
                      <Button
                        disabled={!isEditable}
                        variant="outline"
                        className="self-start"
                        onClick={() => {
                          const clone = [...categoriesList];
                          clone[i].menu.unshift(initialMenu);
                          setCategoriesList(clone);
                        }}
                      >
                        <div className="flex flex-row gap-2 items-center opacity-50">
                          <PlusCircle size={16} />
                          <h1 className="text-start">Add Item</h1>
                        </div>
                      </Button>
                      {category.menu.map((menu, i) => {
                        return (
                          <div
                            className="menu-div flex flex-col lg:flex-row border-2 p-2 gap-2"
                            key={menu._id}
                          >
                            <div
                              className="menu-image w-32 min-h-32 flex
                               flex-col justify-center items-center"
                            >
                              <Button
                                disabled={!isEditable}
                                variant="outline"
                                type="button"
                                className="flex-grow h-full w-full relative"
                                onClick={() => {
                                  const inp = document.getElementById(
                                    `input-${menu._id}`
                                  );
                                  if (inp) inp.click();
                                }}
                              >
                                {menu.picture && (
                                  <div className="close-button absolute top-0 right-0">
                                    <Button
                                      className="p-0.5 size-fit"
                                      variant="default"
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        updateMenuOnChange(
                                          _id,
                                          category.menu,
                                          menu._id,
                                          "picture",
                                          undefined
                                        );
                                      }}
                                    >
                                      <X size={16} />
                                    </Button>
                                  </div>
                                )}
                                <Input
                                  id={`input-${menu._id}`}
                                  type="file"
                                  className={`hidden absolute top-[1000px]`}
                                  onChange={(e) => {
                                    if (e?.target?.files?.[0]) {
                                      updateMenuOnChange(
                                        _id,
                                        category.menu,
                                        menu._id,
                                        "picture",
                                        e.target.files[0]
                                      );
                                    }
                                  }}
                                />
                                {menu.picture ? (
                                  <Image
                                    height={50}
                                    width={50}
                                    alt="menu image"
                                    className="object-contain size-full max-h-[60px]"
                                    src={
                                      typeof menu.picture === "string"
                                        ? menu.picture
                                        : URL.createObjectURL(menu.picture)
                                    }
                                  />
                                ) : (
                                  <>
                                    <PlusCircle
                                      className="opacity-10"
                                      size={30}
                                    />
                                    <h1 className="opacity-50">
                                      Upload Picture
                                    </h1>
                                  </>
                                )}
                              </Button>
                            </div>
                            <div className=" flex flex-col gap-2">
                              <div className="menu-info flex flex-row gap-1">
                                <Input
                                  disabled={!isEditable}
                                  placeholder="Enter Item name"
                                  type="text"
                                  value={menu.item_name}
                                  name="item_name"
                                  onChange={(e) => {
                                    updateMenuOnChange(
                                      _id,
                                      category.menu,
                                      menu._id,
                                      "item_name",
                                      e.target.value
                                    );
                                  }}
                                />

                                <Input
                                  disabled={!isEditable}
                                  placeholder="Enter Item description"
                                  type="text"
                                  value={menu.desc}
                                  onChange={(e) => {
                                    updateMenuOnChange(
                                      _id,
                                      category.menu,
                                      menu._id,
                                      "desc",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>

                              <div className="menu-info flex flex-row gap-1">
                                <Input
                                  disabled={!isEditable}
                                  placeholder="Enter Item price"
                                  type="number"
                                  value={menu.price}
                                  onChange={(e) => {
                                    updateMenuOnChange(
                                      _id,
                                      category.menu,
                                      menu._id,
                                      "price",
                                      e.target.value
                                    );
                                  }}
                                />

                                {/* // <div className="bg-[green]-300 bg-[red]-300 bg-[orange]-300"></div> */}

                                <div className="menu-info flex flex-col gap-1">
                                  <div className="menu-info flex flex-row gap-1">
                                    {foodTypeVegNonVeg.map(
                                      ({ type, color }, index) => (
                                        <Button
                                          disabled={!isEditable}
                                          onClick={() => {
                                            updateMenuOnChange(
                                              _id,
                                              category.menu,
                                              menu._id,
                                              "type",
                                              type
                                            );
                                          }}
                                          variant={
                                            menu.type === type
                                              ? "selected"
                                              : "outline"
                                          }
                                          key={type + index}
                                          type="button"
                                          className="capitalize flex flex-row gap-1 mt-0.5"
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
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
        </div>
        <Button onClick={handleStep2finalsave} type="button">
          Save
        </Button>
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
