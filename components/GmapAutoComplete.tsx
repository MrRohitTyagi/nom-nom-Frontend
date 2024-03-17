"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCallback, useEffect, useState } from "react";
import { LocateFixed, LocateIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  getCityNameFromCoords,
  getLocationSuggestions,
  suggestionType,
} from "@/gateways/locationGateway";
import { Button } from "./ui/button";

export function GmapAutoComplete({
  title = "Click to select a address",
  onSave,
}: {
  onSave: (loc: suggestionType) => void;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [suggestions, setsuggestions] = useState<suggestionType[]>([]);
  const [value, setvalue] = useState("");
  const [isloading, setisloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let id: NodeJS.Timeout | undefined;
    clearTimeout(id);
    id = setTimeout(() => {
      if (!value) return setsuggestions([]);
      setisloading(true);
      getLocationSuggestions(value).then((data) => {
        setisloading(false);
        setsuggestions(data);
      });
    }, 500);
    return () => clearTimeout(id);
  }, [value]);

  const suggestionsAvailable = suggestions.length > 0;

  const handleLocSelect = useCallback(
    (loc: suggestionType) => {
      setvalue("");
      onSave(loc);
      setOpen(false);
      router.push("/welcome");
    },
    [onSave]
  );

  const autoSelect = useCallback(() => {
    window.navigator.geolocation.getCurrentPosition((data) => {
      console.log(data);
      getCityNameFromCoords(data.coords).then(
        ({ display_name, lat, lon }: suggestionType) => {
          setvalue("");
          onSave({ display_name, lat, lon });
          setOpen(false);
          router.push("/welcome");
        }
      );
    });
  }, [onSave]);

  return (
    <>
      <Button
        className="flex flex-row gap-2 "
        variant={"outline"}
        onClick={() => setOpen(true)}
      >
        <LocateIcon size={20} />
        {title}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={value}
          onValueChange={(val) => setvalue(val)}
          placeholder="Type a command or search..."
        />
        <CommandGroup
          className="text-center hover:bg-accent"
          heading={
            <div className="flex flex-row gap-1 items-center cursor-pointer">
              <LocateFixed size={20} />
              <h1>Detect Current location</h1>
            </div>
          }
          onClick={autoSelect}
        ></CommandGroup>
        <CommandList>
          {!suggestionsAvailable && value.length > 0 && (
            <CommandEmpty>
              {isloading ? "Loading suggestions.." : "No results found."}
            </CommandEmpty>
          )}
          {suggestionsAvailable &&
            suggestions.map((loc) => {
              return (
                <>
                  <CommandItem
                    onSelect={() => handleLocSelect(loc)}
                    className="opacity-100"
                    key={loc.display_name}
                  >
                    {loc.display_name}
                  </CommandItem>
                  <CommandSeparator />
                </>
              );
            })}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default GmapAutoComplete;
