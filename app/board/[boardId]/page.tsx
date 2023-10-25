"use client";

import React from 'react';
import {useQuery} from "react-query";
import {useRouter} from "next/navigation";

import {AxiosResponse} from "axios";
import {Board} from "@prisma/client";

import {Button} from "@/components/ui/button";
import {getBoardDetail} from "@/api/board";

const Page = ({ params }: {
    params: {
        boardId: string
    }
}) => {
    const router = useRouter();
    const id = params.boardId;

    const { data } = useQuery<AxiosResponse<Board>>('boardDetail', getBoardDetail.bind(this, id))

    const onClick = () => {
        router.push('/board');
    }

    return (
        <div>
            <h2>제목: {data?.data.title}</h2>
            <div>내용: {data?.data.content}</div>
            <Button onClick={onClick}>뒤로 가기</Button>
        </div>
    );
};

export default Page;