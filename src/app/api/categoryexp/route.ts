import { prisma } from "@/utils/PrismaClient";
import { NextResponse, type NextRequest } from "next/server";


export async function GET(req: NextRequest){
    try {
        const transactions = await prisma.transaction.findMany()
        if(!transactions || transactions.length === 0) {
            return NextResponse.json({ error: "No transactions found" }, { status: 404});
        }

        const categoryExpences: {[category: string]: number} = {}

        for (const tx of transactions){
            categoryExpences[tx.category] = (categoryExpences[tx.category] || 0) + tx.amount
        }

        const transactionsByCategory: {[category: string]: number} = {}
        for (const tx of transactions){
            transactionsByCategory[tx.category] = (transactionsByCategory[tx.category] || 0) + 1
        }

        const sortedCategoryExpences = Object.fromEntries(
            Object.entries(categoryExpences).sort(([catA], [catB])=>catA.localeCompare(catB))
        )

        
        return NextResponse.json({categoryExpences: sortedCategoryExpences, transactionsByCategory}, {status: 200})
    } catch (error) {
        console.log("Error fetching category expenses:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const monthyear = await req.json(); //its a date
        const date = new Date(monthyear)
        const year = date.getFullYear()
        const month = date.getMonth()

        if (typeof month !== "number" || typeof year !== "number") {
            return NextResponse.json({ error: "Invalid month or year" }, { status: 400 });
        }

        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 1);

        const transactions = await prisma.transaction.findMany({
            where: {
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        if (!transactions || transactions.length === 0) {
            return NextResponse.json({ error: "No transactions found for the selected month" }, { status: 404 });
        }

        const categoryExpences: { [category: string]: number } = {};
        for (const tx of transactions) {
            categoryExpences[tx.category] = (categoryExpences[tx.category] || 0) + tx.amount;
        }

        const transactionsByCategory: { [category: string]: number } = {};
        for (const tx of transactions) {
            transactionsByCategory[tx.category] = (transactionsByCategory[tx.category] || 0) + 1;
        }

        const sortedCategoryExpences = Object.fromEntries(
            Object.entries(categoryExpences).sort(([catA], [catB])=>catA.localeCompare(catB))
        )

        return NextResponse.json({ categoryExpences: sortedCategoryExpences, transactionsByCategory }, { status: 200 });
    } catch (error) {
        console.log("Error fetching category expenses for month:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}