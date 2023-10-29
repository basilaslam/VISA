import { NextResponse } from "next/server"


export const GET = async () =>{
    try{
        const response = NextResponse.json(
            {
                message: "Logout successfull",
                success: true
            }
        )

        response.cookies.set("token", "",
        {
            httpOnly: true, expires: new Date(0)
        });
        response.cookies.set("role", "",
        {
            httpOnly: true, expires: new Date(0)
        });
        console.log(response.cookies.get("role"))
        console.log(response.cookies.get("token"))
        
        return response;
    }catch (error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
} 