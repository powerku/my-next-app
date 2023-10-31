import React from 'react';
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";


interface PageNationProps {
    currentPage: number
    totalPage: number;
    setPage: (page: number) => void;
}

const PageNation = ({ totalPage, currentPage = 1, setPage }: PageNationProps) => {
    console.log(Array(totalPage));

    const onClick = (page: number) => {
        setPage(page);
    }

    return (
            <div className="flex justify-center">
                {Array.from(Array(totalPage)).map((number, index) => (
                    <Link
                        key={index}
                        className={buttonVariants({ variant: "outline" })}
                        href={""}
                        onClick={(e) => onClick(index + 1)}
                    >
                        {index + 1}
                    </Link>
                ))}
            </div>
    );
};

export default PageNation;