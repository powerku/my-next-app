import {NextResponse} from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
    try {
        const query = {
            include: {
                author: true
            },
            orderBy: {
                createdAt: "desc"
            }
        }

        const [boards, count] = await prisma.$transaction([
            prisma.board.findMany({
                include: {
                    author: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            }),
            prisma.board.count()
        ]);

        return NextResponse.json({
            pagination: {
                totalPage: Math.ceil(count / 5),
                total: count
            },
            data: boards
        });

    } catch (error) {
        console.log("[USER_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const data = await req.json();

        const user = await prisma.board.create({
            data: data,
        })
        return NextResponse.json(user);
    } catch (error) {
        console.log("[BOARD_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

