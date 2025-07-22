import { categories } from "@/utils/categories";
import { prisma } from "@/utils/PrismaClient";
import { NextResponse, type NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (!month || !year) {
        return NextResponse.json({ error: "Month and year are required." }, { status: 400 });
    }

    const data = await prisma.monthlyBudget.findUnique({
        where: {
            month_year: {
                month: month,
                year: parseInt(year),
            }
        },
        include: {
            budget: true,
        }
    });

    if (!data) {
        return NextResponse.json({ error: "No budget found for the specified month and year." }, { status: 404 });
    }
    return NextResponse.json({ budget: data?.budget }, { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { month, year, budget } = body;
    if (!month || !year || !Array.isArray(budget) || budget.length === 0) {
        return NextResponse.json({ error: "Valid input required." }, { status: 400 });
    }

    try {
        // Check if budget for the given month and year already exists
        const existing = await prisma.monthlyBudget.findUnique({
            where: {
                month_year: {
                    month: month,
                    year: parseInt(year),
                }
            }
        });

        if (existing) {
            return NextResponse.json({ error: "Budget for this month and year already exists." }, { status: 409 });
        }

        const res = await prisma.monthlyBudget.create({
            data: {
                month: month,
                year: parseInt(year),
                budget: {
                    create: budget.map((item: { category: string, budget: number }) => ({
                        category: item.category,
                        budget: item.budget,
                    }))
                }
            },
            include: {
                budget: true,
            }
        });

        return NextResponse.json({ data: res, message: "Monthly budget created successfully." }, { status: 201 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}