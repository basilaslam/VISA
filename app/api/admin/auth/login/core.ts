import jwt from "jsonwebtoken";
import { IUser } from "@/models/user.model";
import { NextResponse } from "next/server";

function generateAccessToken(user: IUser) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!accessTokenSecret) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined in the environment variables');
    }

    const accessToken = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
        },
        accessTokenSecret,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    

    return accessToken

}

function generateRefreshToken(user: IUser) {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!refreshTokenSecret) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined in the environment variables');
    }


    const refreshToken = jwt.sign(
        {
            id: user._id,
        },
        refreshTokenSecret,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
        return refreshToken;
    
        
}

function generateAccessAndRefreshTokens(user: IUser){
    
    try{

        const  accessToken  =  generateAccessToken(user)
        const  refreshToken  =  generateRefreshToken(user)
                
        return { accessToken, refreshToken }
    
    }catch (error) {
        throw new NextResponse(
          "Something went wrong while generating the access token", {status: 500}
        );
    }
}


export { generateAccessAndRefreshTokens };