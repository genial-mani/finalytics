"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  formData,
  setFormData,
}: {
  formData?: {
    amount: string;
    date: string;
    description: string;
    category: string;
} ;
  setFormData?: React.Dispatch<React.SetStateAction<{
    amount: string;
    date: string;
    description: string;
    category: string;
}>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(formData?.date ? new Date(formData.date) : undefined);

  React.useEffect(() => {
    if (formData?.date) {
      setDate(new Date(formData.date));
    } else {
      setDate(undefined);
    }
  }, [formData?.date]);

  const setToday = () => {
    const today = new Date();
    setDate(today);
    if (setFormData) {
      setFormData((prev) => ({ ...prev, date: today.toISOString() }));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Date
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex justify-between"><PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className=" justify-between font-normal gap-5"
          >
            {date ? format(date, "PPP") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
         <Button id="date" variant="outline" className="w-fit px-8" onClick={setToday}>Today</Button>
        </div>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              if (setFormData) {
                setFormData((prev)=> ({...prev, date: date ? date.toISOString() : ""}));
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
