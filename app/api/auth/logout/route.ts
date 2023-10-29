import { NextResponse } from "next/server"


export const GET = async () =>{
    try{
        const response = NextResponse.json(
            {
                message: "Logout successfull",
                success: true
            }
        )
        
        response.cookies.delete('token')
        response.cookies.delete('role')

        return response;
    }catch (error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
} 