"use client";

import React, {useEffect} from 'react';
import LoginButton from "@/components/login-button";
import {useSession} from "next-auth/react";
import axios from "axios";
import {Session} from "next-auth";

interface HeaderProps {
    session?: Session | null;
}

const Header = ({ session }: HeaderProps) => {
    const { data } = useSession();

    // console.log('data', data);
    // console.log('session', session);

    useEffect( () => {
        getAndCreateUser();

        async function getAndCreateUser() {
            async function getUser(email: string) {
                if (!email) {
                    return;
                }

                const { data } = await axios(`/api/user/${email}`);
                return data;
            }
            async function createUser() {
                await axios.post('/api/user', {
                    name: data?.user?.name,
                    email: data?.user?.email,
                    image: data?.user?.image
                })
            }

            try {
                if (!data) {
                    return;
                }
                const email = data.user?.email ?? "";

                const userInfo = await getUser(email);

                if (!userInfo) {
                    await createUser();
                }

            } catch (error) {
                console.log(error);
            }
        }
    }, [data])

    return (
        <div className="h-[48px] bg-black flex items-center">
            <h1 className="text-white">Admin</h1>
            <div className="ml-auto mr-5">
                <LoginButton></LoginButton>
            </div>
        </div>
    );
};

export default Header;