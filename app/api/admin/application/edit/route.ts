import { getDataFromToken } from "@/helpers/getDataFromToken";
import Application from "@/models/application.model";
import { NextRequest, NextResponse } from "next/server";


export const PATCH = async(request: NextRequest) => {
    try {
        console.log("1")
        
        const { role } = getDataFromToken(request)
        if(role !== "ADMIN"){
            return NextResponse.json({ error: "Admin not found" },{status:401})
        }
        console.log("2")
        const { _id, field, value } = await request.json()
        console.log("3")

        const updateQuery = { [field]: value };
        console.log(updateQuery)

       const updatedApplication = await Application.updateOne({_id},updateQuery)
        console.log(updatedApplication)
       return NextResponse.json({ Message: "Application Updated successfully" },{status:200})


    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" },{status:500})
    }
        

}