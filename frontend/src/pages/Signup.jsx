import React, { useState } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { handleError,handleSuccess } from '../utils';

export default function Signup() {

    const [signupInfo,setSignupInfo] = useState({
        name : "",
        email : "",
        password : "",
        location : "",
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e)=>{
        const {name,value} = e.target;
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
      }
    
      const handleSignup = async (e)=>{
        e.preventDefault();
        const {name,email,password} = signupInfo;
        if(!name || !email || !password || !location){
          return handleError("All fields are required")
        }
        try{
          const url = "http://localhost:8080/auth/signup";
          const response = await fetch(url,{
            method:"POST",
            headers : {
              "Content-type" : "application/json"
            },
            body : JSON.stringify(signupInfo),
          });
          const result = await response.json();
          const {success,message,error} = result;
          if(success){
            handleSuccess(message);
            setTimeout(()=>{
              navigate("/login")
            },1000)
          }
          else if(error){
            const details = error?.details[0].message;
            handleError(details);
          }
          else if(!success){
            handleError(message);
          }
        }
        catch(err){
          handleError(err);
        }
      }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div
                style={{
                    boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            >
                <div className="p-8">
                    <h2 className="text-center text-3xl font-extrabold text-white">
                        Welcome
                    </h2>
                    <p className="mt-4 text-center text-gray-400">Sign up to continue</p>
                    <form onSubmit={handleSignup} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label className="sr-only" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    placeholder="name"
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required=""
                                    autoComplete="name"
                                    type="name"
                                    name="name"
                                    id="name"
                                    onChange={handleChange}
                                    value={signupInfo.name}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="sr-only" htmlFor="email">
                                    Email address
                                </label>
                                <input
                                    placeholder="Email address"
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required=""
                                    autoComplete="email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    value={signupInfo.email}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="sr-only" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    placeholder="Password"
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required=""
                                    autoComplete="current-password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    value={signupInfo.password}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="sr-only" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    placeholder="Location"
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    required=""
                                    autoComplete="location"
                                    type="location"
                                    name="location"
                                    id="location"
                                    onChange={handleChange}
                                    value={signupInfo.location}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <input
                                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                                    type="checkbox"
                                    name="remember-me"
                                    id="remember-me"
                                />
                                <label className="ml-2 block text-sm text-gray-400" htmlFor="remember-me">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a className="font-medium text-indigo-500 hover:text-indigo-400" href="#">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer/>
                <div className="px-8 py-4 bg-gray-700 text-center">
                    <span className="text-gray-400">Have an account?</span>
                    <Link className="font-medium text-indigo-500 hover:text-indigo-400" to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
