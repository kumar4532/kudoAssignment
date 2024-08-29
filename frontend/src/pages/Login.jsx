import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

function Login() {

  const {setAuthUser} = useAuthContext();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });  

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user))
        setAuthUser(user);
      } else if (response.status === 400) {
        alert("Please enter correct credientials");
        console.log("No content returned from server.");
      } else {
        console.log("Unexpected response:", response.statusText);
      }  
    } catch (error) {
      console.log("Error while login", error);
    }
  }

  return (
    <div className='flex flex-col items-center mt-52'>
      <h1 className='mb-8 text-2xl'>Login</h1>
      <div className='flex flex-col justify-center items-center'>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input 
          type="text"
          className='mb-6 border rounded-lg p-2 px-6'
          placeholder='Enter Email'
          value={user.email}
          onChange={(e) => setUser({...user, email:e.target.value})} />
          <input 
          type="text"
          className='mb-6 border rounded-lg p-2 px-6'
          placeholder='Enter Password'
          value={user.password}
          onChange={(e) => setUser({...user, password:e.target.value})} />
          <button className='border rounded-md py-2'>Submit</button>
        </form>
        <div className='p-5 mt-2'>
          <p>Create New <Link className='text-red-400' to={"/signup"}>Account</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login;