import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user.model";
import connect from "@/lib/mongodb";

connect()

export const GET = async(request: NextRequest) => {    
    try {
        
        let { _id } = await getDataFromToken(request)
        
         const user = await User.findOne({_id})

          if(!user) return NextResponse.json({message: "user not fount"}, {status:400})
            
        return NextResponse.json({
            message: "User found",
            data: user
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 400})
    }
}