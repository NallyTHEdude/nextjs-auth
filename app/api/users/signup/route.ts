import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import { Console } from "console";


connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        if (!username) throw new Error("Username is required");
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        console.log("\nINFO: Received signup request with data: ", reqBody);

        // if user with email already exists
        const userEmail:any = await User.findOne({ email });
        if (userEmail) {
            console.error("\nERROR: User already exists with this email", email);
            return NextResponse.json(
                { message: "User already exists with this email" },
                { status: 400 }
            );
        }

        // if user with username already exists
        const userUsername:any = await User.findOne({ username });
        if (userUsername) {
            console.error("\nERROR: User already exists username: ", username);
            return NextResponse.json(
                { message: "User already exists with this username" },
                { status: 400 }
            );
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // store the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        console.log("\nINFO: New user created", savedUser);

        // Return success response (do not include password)
        return NextResponse.json(
            {
                message: "User created successfully",
                user: {
                    _id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email
                }
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error: something went wrong while signing up the user: ", error.message);
        return NextResponse.json(
            { message: error.message || "Something went wrong while signing up the user" },
            { status: 500 }
        );
    }
}