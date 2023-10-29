import { getDataFromToken } from "@/helpers/getDataFromToken";
import connect from "@/lib/mongodb";
import Application from "@/models/application.model";
import { NextRequest, NextResponse } from "next/server";
export enum StatusEnum {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
  }

connect()

export const POST = async(request:NextRequest) => {


    try {
    const {_id} = await getDataFromToken(request)

    const { fullname,
    date_of_birth,
    place_of_birth,
    nationality,
    url } = await request.json()


        let savedApplication = await Application.create({fullname,date_of_birth, place_of_birth, nationality, user_pdf: url, uploadedBy: _id, status: "PENDING"})
        
        return NextResponse.json({message: "Applied successfully"},{status: 200})
        
    } catch (error:any) {
        console.log(error);
        
        return NextResponse.json({error: error.message},{status: 500})

    }
}