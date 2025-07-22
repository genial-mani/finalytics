import BudgetPlanner from "@/components/dashboard/BudgetPlanner";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import FinAi from "@/components/dashboard/FinAi";
import { MonthlyBarGraph } from "@/components/dashboard/MonthlyBarGraph";
import MonthlyBudget from "@/components/dashboard/MonthlyBudget";
import { MonthlyCatPieChart } from "@/components/dashboard/MonthlyCatPieChart";
import TransactionsByCat from "@/components/dashboard/TransactionsByCat";
import { Card } from "@/components/ui/card";
const Dashboard = () => {
  return (
    <div className="w-full max-w-full p-2 px-4 flex flex-col">
      <h2 className="text-2xl font-semibold mb-5">Dashboard</h2>
      <div className="w-full max-w-full ">
        <MonthlyBarGraph />
      </div>
      <TransactionsByCat />
      <Card className="flex flex-row flex-wrap justify-center items-center max-[768px]:gap-20 gap-2 mt-2 bg-[#00000099]">
        <div className="w-full sm:max-w-[50%] md:max-w-[45%]">
          <CategoryPieChart />
        </div>
        <div className="w-full sm:max-w-[50%] md:max-w-[45%]">
          <MonthlyCatPieChart />
        </div>
      </Card>
        <MonthlyBudget/>
      <Card className="mt-2 bg-[#00000099]">
        <BudgetPlanner/>
      </Card>
      <FinAi/>
    </div>
  );
};

export default Dashboard;
