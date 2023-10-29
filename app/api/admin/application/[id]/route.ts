import Application from "@/models/application.model"
import { useSearchParams } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(request: NextRequest, route: { params: { id: string } }) => {
    console.log(request);
    
    try {

        const id = route.params.id

        
        let applications = await Application.findOne({_id:id})
        return NextResponse.json(
            {
                message: "Applications successfully loaded",
                data: applications
            },
            {status: 200})
    } catch (error) {
        return NextResponse.json(
            {
                message: "soemthing went wrong",
            },
            {status: 500})
    }

    
}