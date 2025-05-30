import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth/auth_service';

export default function Form() {
  const [user, setUser] = useState({
    name: '',
    password: '',
    role: 'Patient',
  });
  const [error, setError] = useState('');
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handelLogin = async (event) => {
    event.preventDefault();
    try {
      await authService.login(user.name, user.password, user.role).then(
        () => {
          setStep(2)
          setError("")
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            setError('Invalid username or password');
          } else {
            setError('An error occurred, please try again later');
            console.log(error.response, 'Error Details');
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  
  const handelOpt = async (event) => {
    event.preventDefault();
    try{
      await authService
      .verifyOtp(otp)
      .then(() =>{
        if (user.role === 'Practitioner') {
          navigate('/admin-dashboard');
          
        } else if (user.role === 'Patient') {
          navigate('/patient-dashboard');
          
        }
        else if (user.role === 'Admin') {
          navigate('/admin-dashboard');
          
        }
      }, (error) =>{
        setError("invalid otp")
      })

    }catch (err) {
      console.log(err);
    }
  }
  
  

  return (
    
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto flex-col items-center justify-center">
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
            {step === 1 ? (
              <form className="space-y-4" onSubmit={handelLogin}>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2 ">
                    Login as
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={user.role}
                    onChange={(event) =>
                      setUser({ ...user, role: event.target.value })
                    }
                  >
                    <option value="Patient">Patient</option>
                    <option value="Practitioner">Practitioner</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
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
                    value={user.name}
                    onChange={(event) =>
                      setUser({ ...user, name: event.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600 mb-2" 
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={user.password}
                    onChange={(event) =>
                      setUser({ ...user, password: event.target.value })
                    }
                  />
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                <div className="text-center mt-4">
                  <a
                    href="/reset-password-request"
                    className="text-sm text-gray-600 hover:text-blue-500 hover:underline"
                    
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-950 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
                >
                  Login
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handelOpt}>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    Enter verification code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter the code"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                  />
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                <div className="text-center mt-4">
                  <a
                    href="/email-pass-rest"
                    className="text-sm text-gray-600 hover:text-blue-500 hover:underline"
                  >
                    Re-send code
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-950 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      );
      
}
