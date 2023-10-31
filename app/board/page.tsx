"use client";

import React, {useState} from 'react';
import {useQuery} from "react-query";

import {useRouter} from "next/navigation";

import {BoardResponse, BoardWithUsers} from "@/type";
import {getBoard} from "@/api/board";

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

import {format} from "date-fns";
import {useSession} from "next-auth/react";
import PageNation from "@/components/page-nation";

const DATE_FORMAT = 'yyyy-MM-dd';

const Page = () => {
    const {data} = useSession();
    const router = useRouter();
    const query = useQuery<BoardResponse>('board', getBoard);
    const [page, setPage] = useState(1);

    console.log('page', page);

    const goWritePage = () => {
        router.push('/board/write');
    }
    const goDetailPage = (id: number) => {
        router.push(`/board/${id}`);
    }
    return (
        <>
            <div className="float-right p-4">
                {data && <Button onClick={goWritePage}>글쓰기</Button>}
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">제목</TableHead>
                        <TableHead className="text-center w-[200px]">작성자</TableHead>
                        <TableHead className="text-center w-[200px]">작성일자</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {query.data && query.data.data.map((board) => (
                     <TableRow key={board.id} onClick={(e) => goDetailPage(board.id)}>
                         <TableCell className="text-center font-medium">{board.title}</TableCell>
                         <TableCell className="text-center">{board.author.name ?? ""}</TableCell>
                         <TableCell className="text-center">{format(new Date(board.createdAt), DATE_FORMAT)}</TableCell>
                     </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PageNation
                currentPage={page}
                setPage={setPage}
                totalPage={query.data?.pagination?.totalPage ?? 0} />
        </>
    );
};

export default Page;