"use client";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { categories } from "@/utils/categories";
import { Icon } from "@iconify/react";

const TransactionsByCat = () => {
  const [transactionsByCategory, setTransactionsByCatgory] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const getTransactionsByCat = async () => {
      try {
        const res = await fetch("/api/categoryexp", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const data = await res.json();
          console.log(data);
          return;
        }
        const data = await res.json();
        setTransactionsByCatgory(data?.transactionsByCategory);
      } catch (error) {
        console.log(error);
      }
    };

    getTransactionsByCat();
  }, []);
  return (
    <Card className="px-2 sm:px-6 mt-2 bg-[#00000099]">
      <div>
        <CardTitle>Transactions category wise</CardTitle>
        <CardDescription>
          Distribution of transactions among categories
        </CardDescription>
      </div>
      <div className="w-full max-w-full flex gap-4 flex-wrap items-center py-3 text-slate-50">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="w-fit h-12 rounded-md bg-[#000] border flex items-center justify-center p-2 gap-3 max-[365px]:gap-1 cursor-default max-[365px]:text-sm"
          >
            <Icon icon={cat.icon || ""} width={20} height={20} />
            <h2>{cat.name}</h2>
            <p>{transactionsByCategory[cat.name] ?? 0}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionsByCat;
