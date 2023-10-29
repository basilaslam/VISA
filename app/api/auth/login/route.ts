import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User, { IUser } from "@/models/user.model";
import connect from "@/lib/mongodb";
import { generateAccessAndRefreshTokens } from "./core";

    connect()

export const POST = async(req: NextRequest) => {

try {
    const { email, password } = await req.json()

    if(!email){
        return new NextResponse( "Username or email is required", {status: 400});
    }

    const user = await User.findOne({
        email: email
      }) as IUser

      if (!user) {
        return  NextResponse.json({message:"User does not exist"}, { status:404 });
      }
    
      if (user.role !== "USER") {
        return  NextResponse.json({message:"User does not exist"}, { status:404 });
      }
    
      // Compare the incoming password with hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return new NextResponse("Invalid user credentials", {status: 401});
      }

      const { accessToken } =  generateAccessAndRefreshTokens(user);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

    const response = NextResponse.json({
    message: "Login successful",
    success: true,
    loggedInUser
    })

  response.cookies.set("token", accessToken, {
    httpOnly: true
    })
  response.cookies.set("role", "USER", {
    httpOnly: true
    })

    return response

    } catch (error: any) {
        console.log(error);
        
    return NextResponse.json({error: error.message},
        {status: 500})

    }
    
}