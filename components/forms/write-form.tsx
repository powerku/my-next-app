"use client"

import React, {useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";

const FormSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
})

interface WriteFormProps {
    authorId: number | undefined;
}

const WriteForm = ({authorId}: WriteFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            content: ""
        }
    })
    const onSubmit = async (data: z.infer<typeof FormSchema>)=> {
        console.log(authorId);

        try {
            await axios.post('/api/board', {...data, ...{ authorId: authorId ?? 0}});
            router.push('/board');
        } catch(error) {
            console.log('Board POST ERROR', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
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

    );
};

export default WriteForm;