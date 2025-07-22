"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function MonthlyBarGraph() {

  const [monthlyTotals, setMonthlyTotals] = useState<any>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const fetchMonthlyExpenses= async ()=>{
      try {
        const res = await fetch("/api/monthlyexp", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const data = await res.json();
          toast.error(data.error || "Failed to fetch monthly expenses");
        }
        const data = await res.json();
        setMonthlyTotals(data?.monthlyTotals);
        setTotalTransactions(data?.totalTransactions);
        console.log("Monthly Expenses Data:", data);
      } catch (error) {
        console.error("Error fetching monthly expenses:", error);
      }
    }
    fetchMonthlyExpenses()
  },[])


  const monthOrder = [
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

const chartData = monthOrder?.map((month) => ({
  month,
  total: monthlyTotals && (monthlyTotals[month] || 0),
}));

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;


  return (
    <Card className="bg-[#00000099]">
      <CardHeader className="flex shrink-0 justify-between flex-wrap">
        <div>
            <CardTitle>Monthly Transactions</CardTitle>
        <CardDescription>
          Overview of monthly transaction totals in $
        </CardDescription>
        </div>
        <Card className="w-64 h-fit flex flex-row items-center justify-center bg-[#000] text-[#efefef]">
            <h2 className="text-lg">Total Transactions</h2>
            <p className="text-lg">{totalTransactions}</p>
        </Card>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="Total"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar
              dataKey="total"
              fill="#991ef9"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
