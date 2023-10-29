import Application from "@/models/application.model"
import { useSearchParams } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(request: NextRequest) => {

    try {
        const searchParams = useSearchParams()
        const id = searchParams.get('id')
        console.log(id);
        
        let applications = await Application.findOne({_id:id})
       console.log(request.cookies.get('role'))
        return NextResponse.json(
            {
                message: "Applications successfully loaded",
                data: applications
            },
            {status: 200})
    } catch (error) {
        
    }

    
}