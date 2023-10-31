import {Board, User} from "@prisma/client";

export type BaseResponse = {
    pagination?: {
        totalPage: number
        total: number
    },
}

export type BoardResponse = BaseResponse & {
    data: BoardWithUsers[]
}

export type BoardWithUsers = Board & {
    author: User
}