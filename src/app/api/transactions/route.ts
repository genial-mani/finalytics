import {prisma} from '@/utils/PrismaClient';
import { NextResponse, type NextRequest} from 'next/server';


export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.nextUrl);
    const page = parseInt(searchParams.get("page") || "1")
    const limit = 10;
    const skip = (page - 1)*limit;
    try {
        const transactions = await prisma.transaction.findMany({
            orderBy: {
                date: 'desc'
            },
            skip: skip,
            take: limit,
        })
        const total =  await prisma.transaction.count(); 
        console.log("Fetched transactions:", transactions);
        if(!transactions || transactions.length === 0) {
            return NextResponse.json({message: "No transactions found"}, { status: 404 });
        }
        return NextResponse.json({transactions, total}, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json({error: "Internal Server Error"}, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { amount, date, description="", category } = data;
        console.log("Received data:", data);
        if (amount === undefined || amount === null || isNaN(amount) || !date || !category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }


        const newTransaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                date: new Date(date),
                desc: description,
                category,
            },
        });

        return NextResponse.json({newTransaction, message: "Transaction added successfully."}, { status: 201 });
    } catch (error) {
        console.error("Error creating transaction:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}