import WriteForm from "@/components/forms/write-form";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import prisma from "@/lib/db";

const Page = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/board");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email ?? ""
        }
    });

    return (
        <WriteForm authorId={user?.id}/>
    );
};

export default Page;