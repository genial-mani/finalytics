"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { format, startOfMonth } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "../ui/card";

export function MonthYearPicker({
  monthYear,
  setMonthYear,
}: {
  monthYear: string;
  setMonthYear: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);
  const now = startOfMonth(new Date());
  const [date, setDate] = React.useState<Date>(
    monthYear ? startOfMonth(new Date(monthYear)) : now
  );

  React.useEffect(() => {
    if (monthYear) {
      setDate(startOfMonth(new Date(monthYear)));
    } else {
      const now = startOfMonth(new Date());
      setDate(now);
      setMonthYear(now.toISOString());
    }
  }, [monthYear]);

  const setToday = () => {
    const today = new Date();
    setDate(today);
    setMonthYear(today.toISOString());
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <div className=" flex flex-row gap-2 flex-wrap">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {monthYear && format(monthYear, "MMM yyyy")}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <Button
            id="date"
            variant="outline"
            className="w-fit px-8"
            onClick={setToday}
          >
            Current month
          </Button>
        </div>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onMonthChange={(selected) => {
              const monthStart = startOfMonth(selected);
              setDate(monthStart);
              setMonthYear(monthStart.toISOString());
              setOpen(false);
            }}
            classNames={{
              table: "hidden",
              day: "hidden",
              week: "hidden",
              weekdays: "hidden",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
