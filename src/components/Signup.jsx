import React, { useState } from 'react'
import authservice from '../appwrite/auth'
import { Input, Button, Logo } from './index'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login as authLogin } from "../store/authSlice"


const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, handleSubmit] = useForm();
    const [error, setError] = useState("");

    const signUp = async (data) => {
        setError("");
        try {

            const userData = await authservice.createAccount(data);
            if (userData) {
                const user = await authservice.getCurrentUser();
                if (user) dispatch(login(user));
                navigate("/");
            }

        } catch (error) {
            setError(error.message);
        }

    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            </div>

            <form onSubmit={handleSubmit(signUp)}>
                <div className='space-y-5'>
                    <Input
                        label="Full Name: "
                        type="text"
                        placeholder="Enter Your Name"
                        {...register("name"), {
                            required: true
                        }}
                    />
                    <Input
                        label="Email: "
                        type="email"
                        placeholder="Enter Your Email"
                        {...register("email"), {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be valid",
                            }
                        }}
                    />
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter Your Password"
                        {...register("password"), {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) ||
                                    "Password must contain least 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                            }
                        }}
                    />
                    <Button type="submit" className='w-full'>Sign Up</Button>
                </div>


            </form>
        </div>
    )
}

export default Signup