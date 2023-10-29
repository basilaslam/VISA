import { getDataFromToken } from "@/helpers/getDataFromToken"
import connect from "@/lib/mongodb"
import Application from "@/models/application.model"
import { NextRequest, NextResponse } from "next/server"

connect()

export const GET = async(request: NextRequest) => {


    try {
        const { role } = getDataFromToken(request)
        if(role !== "ADMIN"){
            return NextResponse.json({ error: "Admin not found" },{status:401})
        }
        let applications = await Application.find().populate('uploadedBy')
       
        return NextResponse.json(
            {
                message: "Applications successfully loaded",
                data: applications
            },
            {status: 200})
    } catch (error) {
        
    }

    
}