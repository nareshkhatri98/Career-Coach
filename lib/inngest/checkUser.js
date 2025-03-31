import { currentUser } from "@clerk/nextjs/server";
import { db } from "../primsa";

export  const checkUser =  async () =>{
    const user = await currentUser();

    if(!user){
        return null;
    }
    try {
       const loggedInUser = await db.user.findUnique({
            where:{
                clerkUserId:user.id,
            }
        })
        // if user is stored
        if(loggedInUser){
            return loggedInUser;
        }
        // if user is not stored

        const  name = `${user.firstName} ${user.lastName}`;
        const NewUser = await db.user.create({
            data:{
                clerkUserId:user.id,
                name,
                imageUrl:user.imageUrl,
                email:user.emailAddresses[0].emailAddress,
            },
        });

        return NewUser;

    } catch (error) {
        console.log(error.message);
    }
}