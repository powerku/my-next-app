import prisma from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET(req: Request, { params }: {
    params: {
        boardId: number
    }
}) {
    try {
        const boardId = Number(params.boardId);

        const boardDetail = await prisma.board.findUnique({
            where: {
              id: boardId,
            },
            include: {
                author: true
            }
        })
        return NextResponse.json(boardDetail);
    } catch (error) {
        console.log("[USER_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}