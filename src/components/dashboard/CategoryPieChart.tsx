"use client";

import { Cell, Pie, PieChart } from "recharts";

import {
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
import { ChartConfigType } from "./MonthlyCatPieChart";

export interface chartDataType {
  category: string;
  expences: number;
  fill: string | undefined;
}

export function CategoryPieChart() {
  const [totalCatExp, setTotalCatExp] = useState({});
  const [totalCatTransactions, setTotalCatTransactions] = useState({});
  const [chartData, setChartData] = useState<chartDataType[]>([]);

  useEffect(() => {
    const getCategoryExpences = async () => {
      try {
        const res = await fetch("/api/categoryexp", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const data = await res.json();
          console.log(data?.error);
          return;
        }
        const data = await res.json();
        setTotalCatExp(data?.categoryExpences);
        setTotalCatTransactions(data?.transactionsByCategory);
        console.log(data && data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryExpences();
  }, []);

  useEffect(() => {
    if (Object.keys(totalCatExp).length) {
      const chartData = Object.entries(totalCatExp).map(
        ([category, expences]) => ({
          category,
          expences: Number(expences),
          fill: chartConfig[category]?.color,
        })
      );
      setChartData(chartData);
    }
  }, [totalCatExp]);

  const chartConfig: ChartConfigType = {
    expences: {
      label: "expences",
    },
    Groceries: {
      label: "Groceries",
      color: "var(--color-amber)",
    },
    Utilities: {
      label: "Utilities",
      color: "var(--color-blue)",
    },
    Rent: {
      label: "Rent",
      color: "var(--color-red)",
    },
    Entertainment: {
      label: "Entertainment",
      color: "var(--color-purple)",
    },
    Transportation: {
      label: "Transportation",
      color: "var(--color-orange)",
    },
    Healthcare: {
      label: "Healthcare",
      color: "var(--color-cyan)",
    },
    ["Dining Out"]: {
      label: "Dining Out",
      color: "var(--color-rose)",
    },
    Investments: {
      label: "Investments",
      color: "var(--color-lime)",
    },
    Savings: {
      label: "Savings",
      color: "var(--color-pink)",
    },
    ["Pet Care"]: {
      label: "Pet Care",
      color: "var(--color-sky)",
    },
    Miscellaneous: {
      label: "Miscellaneous",
      color: "var(--color-teal)",
    },
  } satisfies ChartConfig;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
  }: any) => {
    const RADIAN = Math.PI / 180;
    // Increase multiplier to push labels further out
    const radius = outerRadius - 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={8}
        stroke="white"
        strokeWidth={1}
        paintOrder="stroke"
      >
        {value}
      </text>
    );
  };
  return (
    <div className="flex flex-col justify-center">
      <CardHeader className="items-center flex-row pb-5 text-center">
        <CardTitle>Category wise Total Expences</CardTitle>
        <CardDescription>Total expences over the years</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="expences"
              label={renderCustomizedLabel}
              nameKey="category"
              outerRadius={120}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
