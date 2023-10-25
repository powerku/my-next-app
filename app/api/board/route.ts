import {NextResponse} from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
    try {
        const users = await prisma.board.findMany({
            include: {
                author: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json(users);
    } catch (error) {
        console.log("[USER_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title, content } = await req.json();

        const user = await prisma.board.create({
            data: {
                title,
                content,
                authorId: 2,
            },
        })
        return NextResponse.json(user);
    } catch (error) {
        console.log("[BOARD_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

