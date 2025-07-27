import { receiptscanner } from "@/actions/recieptscanner";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest){
    const formData = await req.formData();
    const image = formData.get("image") as File;
    if (!image) {
        return NextResponse.json({ error: "No image provided." }, { status: 400 });
    }

    try {
        const extractedData = await receiptscanner(image);
        return NextResponse.json({message: "Receipt scanned successfully",extractedData});    
    } catch (error) {
        const errorMessage = error instanceof Error ? error?.message : "An internal error occurred."
        console.log("Internal error while scanning receipt:", errorMessage)
        return NextResponse.json({error: errorMessage}, {status: 500});
    }
}