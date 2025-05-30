import axios from "axios"

const API_URL = "http://127.0.0.1:8000/";

const signup = (name,password) =>{
    return axios
    .post(API_URL +"/signup" , {
        name,
        password
    })
    .then((response) =>{
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data;
    });   
}

const login = (name, password, role) =>{
    return axios
    .post(API_URL + "login",{ // sending a post request to the backend to the sign up dir through the api url
        name,
        password,
        role
    })
    .then(response =>{ // if the request was successful the response will be checked for an access token
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data)) // if so the local storage will set the key with the values
        }
        return response.data
    })
}

const requestPasswordReset =  (email, name) => {
    
      // Make the POST request to the API
      return axios.post(API_URL + "request-password-reset", {
        email,
        name,
      })
      .then((response) =>{
        return response.data
      }).catch ((error) => {
        // Handle errors gracefully
        console.error("Error requesting password reset:", error.response?.data || error.message);
    
        // Throw the error to handle it in the calling function
        throw error;
      });
  
      // Return the response data if the request is successful
      
    
  };
  
const resetPassword =(token, email , password) =>{
    return axios
    .post(API_URL +'reset-password',{token,email,password})
    .then((response) =>{
        return response.data;
    }).catch((error) =>{
        console.error('Error updating password')
        throw error;
    })
}

const verifyOtp = (otp) => {
  return axios
    .post(API_URL + 'verify-otp' ,{otp})
    .then((response) => {
        return response.data;
    }).catch((error) => {
        console.error('Error verifying OTP:', error);
        throw error; // Rethrow to handle errors in the caller
      });
}


const logout = () =>{
    localStorage.removeItem("user")
}

const getCurrentUser = () =>{
    return JSON.parse(localStorage.getItem("user"))
}
const authService ={
    signup,
    login,
    logout,
    getCurrentUser,
    verifyOtp,
    requestPasswordReset,
    resetPassword
}

export default authService