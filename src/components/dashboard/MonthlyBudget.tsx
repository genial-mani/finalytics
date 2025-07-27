"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categories } from "@/utils/categories";
import { Icon } from "@iconify/react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import useTransactionStore from "@/hooks/useTransactionStore";
import Loader from "../Loader";

type Budget = {
  id: string;
  category: string;
  budget: number;
};

type MonthYear = {
  month: string;
  year: number;
};

const MonthlyBudget = () => {
  const [monthYears, setMonthYears] = useState<MonthYear[]>([]);
  const [selected, setSelected] = useState<MonthYear | null>(null);
  const [budget, setBudget] = useState<Budget[] | null>(null);
  const [open, setOpen] = useState(false);
  const budgets = useTransactionStore((state) => state.budgets);
  const setBudgets = useTransactionStore((state) => state.setBudgets);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllBudgets();
  }, []);

  useEffect(() => {
    if (budgets && budgets.length > 0) {
      const fromBudgets = budgets.map((b) => ({
        month: b.month,
        year: b.year,
      }));
      setMonthYears(fromBudgets);
    }
  }, [budgets]);

  const fetchBudget = async (
    month: string,
    year: number
  ): Promise<Budget[]> => {
    setIsLoading(true);
    const res = await fetch(`/api/monthlybudget?month=${month}&year=${year}`);
    if (!res.ok) {
      setIsLoading(false)
      throw new Error("Failed to fetch budget");
    }
    const data = await res.json();
    console.log(data);
    setIsLoading(false)
    return data.budget;
  };

  const handleOpen = async (monthYear: MonthYear) => {
    setSelected(monthYear);
    setOpen(true);
    try {
      const budgetData = await fetchBudget(monthYear.month, monthYear.year);
      setBudget(budgetData);
    } catch {
      setBudget(null);
    }
  };

  const fetchAllBudgets = async () => {
    const res = await fetch("/api/monthlybudget/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.log("error fetching budgets");
      return;
    }
    const data = await res.json();
    console.log(data);
    if (data?.budgets) {
      setBudgets(data.budgets);
    }
    return;
  };

  return (
    <Card className="mt-2 bg-[#00000099]">
      <div>
        <CardTitle className="pl-5">Monthly Budgets</CardTitle>
        <CardDescription className="pl-5">
          Click on the month year to view
        </CardDescription>
      </div>
      <div className="flex flex-wrap gap-2 px-5">
        {monthYears.map((my) => (
          <Dialog
            key={`${my.month}-${my.year}`}
            open={
              open && selected?.month === my.month && selected?.year === my.year
            }
            onOpenChange={setOpen}
          >
            <DialogTrigger asChild>
              <button
                className="px-3 py-1 rounded-md bg-[#000] border text-slate-50 flex flex-row justify-center items-center gap-2 cursor-pointer hover:bg-[#3f3f46]"
                onClick={() => handleOpen(my)}
              >
                <Icon icon="si:info-line" width="20" height="20" />
                {my.month} {my.year}
              </button>
            </DialogTrigger>
            <DialogContent className="text-gray-500">
              <DialogHeader>
                <DialogTitle>
                  Budget for {my.month} {my.year}
                </DialogTitle>
              </DialogHeader>
              {budget && !isLoading ? (
                <div>
                  {/* Render budget details here */}
                  {budget.length > 0 ? (
                    <ul>
                      {budget.map((b) => {
                        const cat = categories.find(
                          (c) => c.name === b?.category
                        );
                        return (
                          <li
                            key={b.id}
                            className="flex items-center gap-2 py-1"
                          >
                            {cat && (
                              <Icon icon={cat.icon} width={20} height={20} />
                            )}
                            <span className="font-medium">{b.category}</span>
                            <span className="ml-auto">${b.budget}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div>No budget found.</div>
                  )}
                </div>
              ) : (
                <Loader />
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </Card>
  );
};

export default MonthlyBudget;
