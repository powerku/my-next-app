import {NextResponse} from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json(users);

    } catch (error) {
        console.log("[USER_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const user = await prisma.user.create({
            data: {
                name: 'powerku',
                email: 'powerku@prisma.io',
            },
        })
        return NextResponse.json(user);
    } catch (error) {
        console.log("[USER_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

