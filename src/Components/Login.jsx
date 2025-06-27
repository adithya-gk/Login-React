import React, { useState } from 'react'
import { auth } from "../assets/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
const Login = () => {

    const [isLoginMode, setIsLoginMode] = useState(true)
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPass, setConfirmPass] = useState('');
    const [name, setName] = useState('');
    const[error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        if (!isLoginMode && password !== confirmPass) {
            setError("Passwords do not match ");
            return;
        }

        try {
            if (isLoginMode) {

                await signInWithEmailAndPassword(auth, email, password);
                setMessage("Logged in successfully");

            }else{

                await createUserWithEmailAndPassword(auth, email, password);
                setMessage("Account created successfully");
            }

            setTimeout(() => setMessage(''), 800);

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPass('');
        } catch(err){
            setError("Invalid Username or Password");
            setTimeout(() => setError(''), 800);
        }


    }
  return (
    <div className= 'w-[430px] bg-white p-8 rounded-2xl shadow-lg'>
        {/* Header Title*/}
        <div className='flex justify-center mb-4'>
            <h2 className='text-3xl font-semibold text-center'>{isLoginMode ? "Login" : "Sign Up"}</h2>
        </div>

        {/*Tab controls*/}
        <div className = 'relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden'> 
            <button onClick={()=> setIsLoginMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${ isLoginMode ? "text-white" : "text-black"}`}>
                Login 
            </button>
            <button onClick={()=> setIsLoginMode(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-black" : "text-white"}`}>
                Sign Up
            </button>
            <div className ={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 ${isLoginMode ? "left-0" : "left-1/2"}`}> </div>
        </div>

        {/*Form Section*/}
        <form className='space-y-4' onSubmit={handleSubmit}>
            { !isLoginMode &&(
                <input type = "text" placeholder = 'Name' value={name} onChange={(e)=> setName(e.target.value)} required className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400'/>
            )}
            {/* Shared Input Field*/}
            <input type = "email" placeholder='Email Address' value={email} onChange={(e)=> setEmail(e.target.value)} required className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400'/>
            <input type = "password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400' />

            {/* Signup Field */}
            { !isLoginMode &&(
            <input type = "password" placeholder='Confirm Password' value={confirmPass} onChange={(e)=> setConfirmPass(e.target.value)}required className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400'/>
            )}

            {/*Forget Password for Login*/}
            { isLoginMode && (
                <div className='text-right'> 
                    <p className='text-cyan-600 hover:underline'>Forgot Password</p>
                </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            {/*Shared Button*/}
            <button className='w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition'>
                { isLoginMode ? "Login " : "Sign Up" }
            </button>

            {/* Switch Link */}
            <p className='text-center text-gray-600 '>{ isLoginMode ? "Don't have an account " : "Already have an account "}
                <a href="#" onClick={(e)=> setIsLoginMode(!isLoginMode)} className='text-cyan-600 hover:underline'>
                    {isLoginMode ? "Signup Now" : "Login"}
                </a>
            </p>
        </form>
    </div>
  )
}

export default Login