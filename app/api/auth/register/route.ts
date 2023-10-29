import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from "@/models/user.model";
import connect from "@/lib/mongodb";

enum UserRolesEnum {

    "USER" = "USER",
    "ADMIN" = "ADMIN"
    
    }

    connect()


export const POST = async(req: NextRequest) => {

    const {email, username, password, role } = await req.json();

    
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existedUser) {
        return new NextResponse("User with email or username already exists", {status: 409});
      }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
     
      
      const user = await User.create({
        email,
        password: hashedPassword,
        username,
        isEmailVerified: false,
        role: role || UserRolesEnum.USER,
      });
      


      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
      );
    
      if (!createdUser) {
        return new NextResponse("Something went wrong while registering the user", {status: 500});
      }
    
      return new NextResponse("Users registered successfully and verification email has been sent on your email.", {status:201, statusText: "OK"})
        
        
}