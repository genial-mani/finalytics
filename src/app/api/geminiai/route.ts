import { prisma } from '@/utils/PrismaClient'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse, type NextRequest } from 'next/server'
import { categories } from '@/utils/categories'
import { format } from 'date-fns';

export async function POST(req: NextRequest){
    try {
        const totalTransactions = await prisma.transaction.findMany();
const allBudgets = await prisma.monthlyBudget.findMany({
    include: {
        budget: true,
    }
});

if (!totalTransactions || totalTransactions.length === 0) {
    return NextResponse.json({ message: "Hey! You haven't made a transaction yet. Give it a try." });
}

// Group transactions by month/year and category
const monthlyCategoryExpenses: Record<string, Record<string, number>> = {};
for (const tx of totalTransactions) {
    const monthYear = format(tx.date, "MMMM yyyy");
    if (!monthlyCategoryExpenses[monthYear]) monthlyCategoryExpenses[monthYear] = {};
    monthlyCategoryExpenses[monthYear][tx.category] = (monthlyCategoryExpenses[monthYear][tx.category] || 0) + tx.amount;
}

// Prepare budgets by month/year and category
const monthlyBudgets: Record<string, Record<string, number>> = {};
for (const monthlyBudget of allBudgets) {
    const monthYear = `${monthlyBudget.year} ${String(monthlyBudget.month)}`;
    if (!monthlyBudgets[monthYear]) monthlyBudgets[monthYear] = {};
    for (const budget of monthlyBudget.budget) {
        monthlyBudgets[monthYear][budget.category] = budget.budget;
    }
}

// Prepare analytic summary for AI
const analyticSummary = {
    totalTransactions: totalTransactions.length,
    monthlyCategoryExpenses,
    monthlyBudgets,
    transactionsByCategory: Object.entries(totalTransactions.reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>)),
    categories: categories.map(c => c.name),
};

    const data = await req.json();
const userPrompt = data.body;

        const prompt = `
You are a personal finance assistant. Only answer if the questions atleast slightly related to the user's transactions, spendings, expences, budgets and planning the expences below. 
If the user's question is not even 1% related to their personal finance data, reply: "Sorry, I can only answer questions related to your personal finance transactions and budgets. Try again!"

User's financial data:
${JSON.stringify(analyticSummary, null, 2)}

User question: ${userPrompt}
`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();

        return NextResponse.json({output: output}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}