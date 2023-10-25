"use client";

import React, {useState} from 'react';
import {useForm} from "react-hook-form";

import {useRouter} from "next/navigation";

import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import {Textarea} from "@/components/ui/textarea";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

const FormSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
})

const Page = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    })

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof FormSchema>)=> {
        try {
            setIsLoading(true);
            await axios.post('/api/board', data)

            router.push('/board');
        } catch(error) {
            console.log('Board POST ERROR', error);

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>제목</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="제목을 입력하세요"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>내용</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="내용을 입력하세요"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={isLoading}
                    >Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default Page;