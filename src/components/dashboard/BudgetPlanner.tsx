'use client'

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/categories";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "sonner";
import useTransactionStore from "@/hooks/useTransactionStore";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type BudgetFormValues = {
  month: string;
  year: string;
  budget: { category: string; budget: number }[];
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString());

const BudgetPlanner: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<BudgetFormValues>({
    defaultValues: {
      month: "",
      year: "",
      budget: categories.map((cat) => ({ category: cat.name, budget: 0 })),
    },
  });
  const addBudget = useTransactionStore((state)=> state.addBudget)

  const onSubmit = async (data: BudgetFormValues) => {
      const res = await fetch("/api/monthlybudget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if(!res.ok){
        const data = await res.json()
        console.log(data)
        toast.error(data?.error)
    }
    const response = await res.json()
    addBudget(response?.data)
    toast.success(response?.message)
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-full mx-auto flex justify-center flex-col"
    >
      <div className="w-full flex justify-center gap-4 max-w-full">
        <Controller
          name="month"
          control={control}
          rules={{ required: "Month is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="year"
          control={control}
          rules={{ required: "Year is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="w-full max-w-full flex justify-center px-2 flex-wrap gap-2">
        {categories.map((cat, idx) => (
          <div key={cat.name} className="flex items-center gap-4 max-[350px]:text-sm ">
            <span className="w-40 max-[350px]:w-30  flex items-center gap-2">
              <Icon icon={cat?.icon} width={20} height={20}/>
              <span>{cat.name}</span>
            </span>
            <Input
              type="number"
              step="0.01"
              min={0}
              {...register(`budget.${idx}.budget`, {
                valueAsNumber: true,
                min: 0,
              })}
              placeholder="0"
              className="w-32"
            />
            <input
              type="hidden"
              {...register(`budget.${idx}.category`)}
              value={cat.name}
            />
          </div>
        ))}
      </div>
      <Button type="submit" className="mx-auto">Save Budget</Button>
    </form>
  );
};

export default BudgetPlanner;
