import { prisma } from "@/utils/PrismaClient";
import { format } from "date-fns";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest){
    try {
        const transactions = await prisma.transaction.findMany({
      select: { date: true, amount: true }
    });

    const monthlyTotals: { [month: string]: number } = {};

    for (const tx of transactions) {
      const month = format((tx.date), "MMMM");
      monthlyTotals[month] = (monthlyTotals[month] || 0) + tx.amount;
    }
    const totalTransactions = Object.keys(transactions).length;

    return NextResponse.json({ monthlyTotals, totalTransactions }, { status: 200 });
    } catch (error) {
        console.error("Error fetching monthly expenses:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}