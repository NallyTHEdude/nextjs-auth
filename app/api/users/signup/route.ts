import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import print from "@/helpers/print.helper";


connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        if (!username) throw new Error("Username is required");
        if (!email) throw new Error("Email is required");
        if (!password) throw new Error("Password is required");

        print("Request body is", reqBody);

        // is user already exists
        const user:any = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exists with this email" },
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

        print("New user created", savedUser);

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
        return NextResponse.json(
            { error: error.message || "Something went wrong while signing up the user" },
            { status: 500 }
        );
    }
}