import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from '../Utils';
import axios from 'axios'; // Ensure axios is installed

export default function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        latitude: null,
        longitude: null,
    });

    const [loadingLocation, setLoadingLocation] = useState(false); // State to track if location is being fetched
    const navigate = useNavigate();

    // Function to capture live location and fetch the address
    const captureLocation = () => {
        if (navigator.geolocation) {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    setSignupInfo((prevInfo) => ({
                        ...prevInfo,
                        latitude: lat,
                        longitude: lon
                    }));

                    // Use reverse geocoding to get the address
                    try {
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                        );
                        const address = response.data.display_name;
                        setSignupInfo((prevInfo) => ({
                            ...prevInfo,
                            location: address // Pre-fill the location field with the address
                        }));
                        setLoadingLocation(false);
                    } catch (error) {
                        console.error("Error fetching address from coordinates: ", error);
                        handleError("Failed to get your location. Please enter manually.");
                        setLoadingLocation(false);
                    }
                },
                (error) => {
                    console.error("Error capturing location: ", error);
                    handleError("Failed to capture your live location.");
                    setLoadingLocation(false);
                }
            );
        } else {
            handleError("Geolocation is not supported by your browser.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, location, latitude, longitude } = signupInfo;

        if (!name || !email || !password || !location) {
            return handleError("All fields are required");
        }

        if (!latitude || !longitude) {
            return handleError("Unable to get live location. Please try again.");
        }

        try {
            const url = "https://xploro-backend.vercel.app/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name, email, password, location, latitude, longitude }),
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    // Capture location when the component mounts
    useEffect(() => {
        captureLocation(); // Automatically capture live location on mount
    }, []);

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
                                    type="text"
                                    name="location"
                                    id="location"
                                    onChange={handleChange}
                                    value={signupInfo.location}
                                />
                            </div>
                        </div>

                        {loadingLocation && (
                            <p className="text-sm text-indigo-400">Fetching live location...</p>
                        )}

                        <div>
                            <button
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
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
