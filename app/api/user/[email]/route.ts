import prisma from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET(req: Request, { params }: {
    params: {
        email: string
    }
}) {
    try {
        const email = params.email;

        const useInfo = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })
        return NextResponse.json(useInfo);
    } catch (error) {
        console.log("[USER_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}