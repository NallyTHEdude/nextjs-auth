"use client";
import Link from 'next/link';
import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';


function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignUp = async () => {
    try{
      setLoading(true);
      const response = await axios.post('/api/users/signup', user); 
      // console.log("RESPONSE DATA IS: ",response.data);
        toast.success("Signup successful! Please log in.");
        setTimeout(()=>{
          router.push('/login');

        }, 1000);
    } catch (error: any) {
      console.log("Signup Failed: ", error.message);
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =>{
    if(user.email.length >0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
    <div className="w-full max-w-md bg-gray-800 text-white p-8 rounded-2xl shadow-lg">
      
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create Account
      </h1>

      {/* Username */}
      <label className="block mb-1 text-sm text-gray-300">
        Username
      </label>
      <input
        type="text"
        value={user.username}
        onChange={(e) =>
          setUser({ ...user, username: e.target.value })
        }
        placeholder="Enter username"
        className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-gray-400 focus:outline-none"
      />

      {/* Email */}
      <label className="block mb-1 text-sm text-gray-300">
        Email
      </label>
      <input
        type="email"
        value={user.email}
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
        placeholder="Enter email"
        className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-gray-400 focus:outline-none"
      />

      {/* Password */}
      <label className="block mb-1 text-sm text-gray-300">
        Password
      </label>
      <input
        type="password"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
        placeholder="Enter password"
        className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-gray-400 focus:outline-none"
      />

      {/* Signup Button */}
      <button
        onClick = {!buttonDisabled ? onSignUp: undefined}
        className={` w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition ${buttonDisabled ? "hover:none opacity-30" : "cursor-pointer"}`}
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>

      {/* Login Redirect */}
      <div className='flex justify-center items-center pt-4'>
        <Link className="text-center text-gray-400 text-sm" href="/login">
          Already have an account? Log in
        </Link>
      </div>

    </div>
  </div>
);

}

export default SignUpPage;