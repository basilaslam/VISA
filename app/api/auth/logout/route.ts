import { NextResponse } from "next/server"


export const GET = async () =>{
    try{
        const response = NextResponse.json(
            {
                message: "Logout successfull",
                success: true
            }
        )
        response.cookies.set("token", "", {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            expires: new Date(0) 
          })
        response.cookies.set("role", "", {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            expires: new Date(0) 
          })

        
        return response;
    }catch (error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
} 