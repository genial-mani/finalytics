import { prisma } from '@/utils/PrismaClient';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const budgets = await prisma.monthlyBudget.findMany();
        if(!budgets){
            return NextResponse.json({error: "No budgets found."}, {status: 500})
        }
        return NextResponse.json({ budgets });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch month-years' }, { status: 500 });
    }
}
