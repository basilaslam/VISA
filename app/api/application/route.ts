import { getDataFromToken } from "@/helpers/getDataFromToken"
import connect from "@/lib/mongodb"
import Application from "@/models/application.model"
import { NextRequest, NextResponse } from "next/server"

connect()

export const GET = async(request: NextRequest) => {


    try {
        const { _id } = getDataFromToken(request)
        let applications = await Application.find({uploadedBy: _id})
        return NextResponse.json(
            {
                message: "Applications successfully loaded",
                data: applications
            },
            {status: 200})
    } catch (error) {
        return NextResponse.json(
            {
                error: "Somethin went wrong",
                
            },
            {status: 500})
    }

    
}
