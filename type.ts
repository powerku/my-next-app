import {Board, User} from "@prisma/client";

export type BoardWithUsers = Board & {
    author: User
}