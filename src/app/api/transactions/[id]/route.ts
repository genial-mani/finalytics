import {prisma} from "@/utils/PrismaClient";
import { NextResponse, type NextRequest } from "next/server";

type Context = {
    params: {
        id: string;
    }
}


export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    console.log("Fetching transaction with ID:", id);
    if (!id) {
        return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
    }
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id },
        });
        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }
        return NextResponse.json({ transaction }, { status: 200 });
    } catch (error) {
        console.error("Error fetching transaction:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const data = await req.json()
    const { id } = await context.params;
    console.log("Received data for update:", data);
    if (!id) {
        return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
    }
    console.log("Transaction ID:", id);
    const existingTransaction = await prisma.transaction.findUnique({
        where: { id },
    });
    if (!existingTransaction) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    const { amount, date, description="", category } = data;
    if (!amount || !date || !category) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    try {
        const updatedTransaction = await prisma.transaction.update({
            where: { id },
            data: {
                amount: parseFloat(amount),
                date: date,
                desc: description || "",
                category,
            },
        });
       return NextResponse.json({updatedTransaction, message: "Transaction updated successfully."}, { status: 200 });
    } catch (error) {
        console.error("Error updating transaction:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    try {
        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }
        const existingTransaction = await prisma.transaction.findUnique({
            where: { id },
        });
        if (!existingTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }
        const deletedTransaction = await prisma.transaction.delete({
            where: { id },
        });
        return NextResponse.json({deletedTransaction, message: "Transaction deleted successfully."}, { status: 200 });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}