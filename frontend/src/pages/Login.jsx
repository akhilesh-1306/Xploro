import React, { useState } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import { handleError,handleSuccess } from '../utils';

export default function Login() {

    const [loginInfo,setLoginInfo] = useState({
        email : "",
        password : "",
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e)=>{
        const {name,value} = e.target;
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
      }
    
      const handleLogin = async (e)=>{
        e.preventDefault();
        const {email,password} = loginInfo;
        if(!email || !password){
          return handleError("All fields are required")
        }
        try{
          const url = "xploro-backend.vercel.app/auth/login";
          const response = await fetch(url,{
            method:"POST",
            headers : {
              "Content-type" : "application/json"
            },
            body : JSON.stringify(loginInfo),
          });
          const result = await response.json();
          const {success,message,jwtToken,name,error} = result;
          if(success){
            handleSuccess(message);
            localStorage.setItem("token",jwtToken);
            localStorage.setItem("loggedInUser",name);
    
            setTimeout(()=>{
              navigate("/home")
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
                        Welcome Back
                    </h2>
                    <p className="mt-4 text-center text-gray-400">Login to continue</p>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md shadow-sm">
                            <div>
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
                                    value={loginInfo.email}
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
                                    value={loginInfo.password}
                                />
                            </div>
                        </div>

                        {/* <div className="flex items-center justify-between mt-4">
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
                        </div> */}

                        <div>
                            <button
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                type="submit"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                <ToastContainer/>
                </div>
                <div className="px-8 py-4 bg-gray-700 text-center">
                    <span className="text-gray-400">Don't have an account?</span>
                    <Link className="font-medium text-indigo-500 hover:text-indigo-400" to="/signup">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
