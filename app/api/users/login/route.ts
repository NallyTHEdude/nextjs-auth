import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse, userAgent} from "next/server";
import bcrypt from "bcryptjs";
import { env } from "process";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const {email, password} = await requestBody;
        
        if(!email) throw new Error("Email is required");
        if(!password) throw new Error("Password is required");
        console.log("\nINFO: Received login request with data: ", requestBody);

        // check if user with email exists
        const user = await User.findOne({email});
        if(!user) {
            console.error("\nError: No user found with this email: ", email);
            return NextResponse.json(
                { message: "No user found with this email" },
                { status: 404 }
            );
        }
        // compare the password
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            console.error("\nError: Invalid password for email: ", email);
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //creating a token
        const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, { expiresIn: '1d' });

        // creating a response
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        });

        // set token in httpOnly cookie
        response.cookies.set("token",token, {
            httpOnly:true,
            
        });
        return response;

    } catch (error: any) {
        console.error("\n Error: something went wrong while logging in the user: ", error.message);
        return NextResponse.json(
            { message: error || "Something went wrong while signing up the user" },
            { status: 500 }
        );
    }
}