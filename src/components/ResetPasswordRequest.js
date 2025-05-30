import React from 'react'
import authService from '../services/auth/auth_service'
import { useState} from 'react';
import Header from './Header';

function ResetPasswordRequest() {
    
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState(
        {
            name: '',
            email: '',
        }
    )
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");
        setIsLoading(true);

        if (!info.email || !info.name) {
            setError("Both fields are required.");
            setIsLoading(false);
            return;
          }

        try {
            console.log("started")
          // Call the requestPasswordReset function
          await authService.requestPasswordReset(info.email,info.name)
          .then(() => {
            setMessage("Password reset link sent to your email.");
            setError("")
           // For debugging
          }, (error) =>{
            setError("invalid name or email")
          })
    
          // Display a success message to the user
          
    
        } catch (err) {
          // Handle errors and display them to the user
          console.log(err)
          setError(
            err.response?.data?.detail || "An error occurred. Please try again later."
          );
          
        }finally{
            setIsLoading(false);
        }
      };

  return (
    
    <div className=''>
        <Header/>
        
    <div className='flex justify-center items-center h-screen'>
      
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto flex-col items-center justify-center  ">
    <p className='flex items-center justify-center mb-4 text-'>forgot password</p>
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
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-600 mb-2 "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={info.name}
                    onChange={(event) =>
                      setInfo({...info, name:event.target.value})
                    }
                  />
                </div>
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
                        setInfo({...info, email:event.target.value})
                    }
                  />
                </div>
                {message && <div className="text-green-500 text-sm mt-2">{message}</div> }
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                <div className="text-center mt-4">
                  {/* <a
                    href="/reset-password"
                    className="text-sm text-gray-600 hover:text-blue-500 hover:underline"
                  >
                    
                  </a> */}
                </div>
                <button
              type="submit"
              className={`w-full font-bold py-2 px-4 rounded-md mt-4 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-950 text-white hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
              
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ResetPasswordRequest
