"use client";

import { Pie, PieChart, Cell } from "recharts";
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
import { MonthYearPicker } from "./MonthYearPicker";
import { useState, useEffect } from "react";
import { chartDataType } from "./CategoryPieChart";

export type ChartConfigType = {
  [key: string]: { label: string; color?: string };
};

export function MonthlyCatPieChart() {
  const [monthYear, setMonthYear] = useState<{month: number, year: number}>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [monthlyCatExp, setMonthlyCatExp] = useState<Record<string, number>>(
    {}
  );
  const [chartData, setChartData] = useState<chartDataType[]>([]);

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

  useEffect(() => {
    const fetchMonthlyCatExp = async () => {
      console.log("month year", monthYear);
      try {
        const res = await fetch(`/api/categoryexp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(monthYear),
        });
        if (!res.ok) {
          const data = await res.json();
          console.log(data?.error);
          setMonthlyCatExp({});
          return;
        }
        const data = await res.json();
        setMonthlyCatExp(data?.categoryExpences || {});
        console.log("monthlycatexp", data);
        console.log(monthlyCatExp);
      } catch (error) {
        console.log(error);
        setMonthlyCatExp({});
      }
    };
    if(monthYear){
      fetchMonthlyCatExp();
    }
  }, [monthYear]);

  useEffect(() => {
    if (monthlyCatExp && Object.keys(monthlyCatExp).length) {
      const chartData = Object.entries(monthlyCatExp).map(
        ([category, expences]) => ({
          category,
          expences: Number(expences),
          fill: chartConfig[category]?.color,
        })
      );
      setChartData(chartData);
    } else {
      setChartData([]);
    }
  }, [monthlyCatExp]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
  }: any) => {
    const RADIAN = Math.PI / 180;
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
        strokeWidth={0.5}
        paintOrder="stroke"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="flex flex-col">
      <CardHeader className="flex items-center justify-between flex-row flex-wrap pb-5">
        <div className="flex flex-col gap-1.5">
          <CardTitle>Category wise Monthly Expences</CardTitle>
          <CardDescription>
            Total expences in the selected month
          </CardDescription>
        </div>
        <MonthYearPicker monthYear={monthYear} setMonthYear={setMonthYear} />
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
