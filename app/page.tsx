"use client";

import axios from "axios";
import {useQuery} from "react-query";
import {Button} from "@/components/ui/button";

interface user {
    name: string,
    email: string
}


const Page =  () => {

    const getUsers = async () => {
        const response = await fetch("/api/user")
        return await response.json();
    }

    const query = useQuery<user[]>('users', getUsers)

    if (query.isLoading) {
        return <div>isLoading....</div>
    }

    const onClick = () => {
        axios.post('/api/user');
    }

    return (
        <div>
            <h2>Board</h2>
            <Button onClick ={onClick}>Create User</Button>
            {query.data && query.data.map((user) => (
                <ul key={user.name}>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                </ul>
            ))}

        </div>
    );
};

export default Page;