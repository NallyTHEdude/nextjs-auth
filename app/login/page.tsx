"use client";
import Link from 'next/link';
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';


function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      // console.log("\nINFO: Login Response: ", response.data);
      toast.success("Login successful!");
      setTimeout(() => {
        router.push('/profile');
      }, 1000); 
    } catch (error: any) {
      // console.error("\n Error: something went wrong while logging in the user: ", error);
      toast.error("Login failed: kindly check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
    <div className="w-full max-w-md bg-gray-800 text-white p-8 rounded-2xl shadow-lg">
      
      <h1 className="text-3xl font-semibold text-center mb-6">
        Login
      </h1>

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

      {/* Login Button */}
      <button
        onClick={onLogin}
        className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Login Redirect */}
      <div className='flex justify-center items-center pt-4'>
        <Link className="text-center text-gray-400 text-sm" href="/signup">
          Not Registered? Register here
        </Link>
      </div>

    </div>
  </div>
);

}

export default LoginPage;