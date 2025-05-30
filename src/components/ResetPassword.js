import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import authService from '../services/auth/auth_service';
import Header from './Header';


function ResetPassword() {
const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Get the token from the URL
    const [info, setInfo] = useState({
        email:"",
        password:"",
        rPass:"",
        token:token
    })
    
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const isMatch = info.rPass && info.password === info.rPass;

    const handleSubmit = async (event) =>{
        event.preventDefault()
        setMessage('')
        setError('')
        

        try{
            await authService.resetPassword(info.token, info.email,info.password)
            setMessage('Password successfully reset! you can log in')
        }catch (err) {
            setError(err.response?.data?.detail || 'An error occurred. Please try again.');
          }
    }
  return (
    <div className=''>
            <Header/>
        <div className='flex justify-center items-center h-screen'>
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto flex-col items-center justify-center  ">
              <div className="logo text-center mb-6">
                <img
                  src="https://img.icons8.com/ios-filled/100/1e2d5f/heart-with-pulse.png"
                  alt="Logo"
                  className="mx-auto"
                />
                <h1 className="text-xl font-bold text-gray-700">Idoctor</h1>
                <hr className="mt-4" />
              </div>
              
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600 mb-2" 
                      >
                        email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={info.email}
                        onChange={(event) =>
                            setInfo({...info,email:event.target.value})
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-600 mb-2 "
                      >
                        New Password
                      </label>
                      <input
                        type="text"
                        id="password"
                        placeholder="Enter your name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={info.password}
                        onChange={(event) =>
                            setInfo({...info,password:event.target.value})
                        }
                      />
                    </div>
                    <div className="mt-4 relative">
                        <label
                        htmlFor="repeat-password"
                        className="block text-sm font-medium text-gray-600 mb-2"
                        >
                        Repeat Password
                        </label>
                        <input
                        type="password"
                        id="repeat-password"
                        placeholder="Repeat the password you wrote above"
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 ${
                            info.rPass
                            ? isMatch
                                ? "border-green-500 focus:ring-green-500"
                                : "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        value={info.rPass}
                        onChange={(event) =>
                             setInfo({...info,rPass:event.target.value})}
                        />
                        {/* Icon Feedback */}
                        {info.rPass && (
                        <span
                            className={`absolute right-3 top-9 text-lg ${
                            isMatch ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {isMatch ? "✔" : "✖"}
                        </span>
                        )}
                    </div>
                    {/* {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>} */}
    
                    <div className="text-center mt-4">
                      {/* <a
                        href="/reset-password"
                        className="text-sm text-gray-600 hover:text-blue-500 hover:underline"
                      >
                        
                      </a> */}
                    </div>
                    <button
                  type="submit"
                  className={"w-full font-bold py-2 px-4 rounded-md mt-4 bg-blue-950 text-white hover:bg-blue-600"} >
                    Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
        </div>
  )
}

export default ResetPassword
