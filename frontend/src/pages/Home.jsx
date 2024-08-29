import React, { useState } from 'react'
import { useAuthContext } from '../context/authContext';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Home() {
  const {authUser, setAuthUser} = useAuthContext();
  const [profile, setProfile] = useState({
    user: authUser._id,
    education: "",
    experience: "",
    skills: "",
    resume: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('user', profile.user);
      formData.append('education', profile.education);
      formData.append('experience', profile.experience);
      formData.append('skills', profile.skills);
      formData.append('resume', profile.resume);

      const response = await fetch("/api/profile/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Details has been added")
        setProfile({
          education: "",
          experience: "",
          skills: "",
          resume: null,
        })
      }
    } catch (error) {
      console.log("Error while uploading profile");
    }
  }

  const handleFileChange = (e) => {
    setProfile({...profile, resume: e.target.files[0]});
  };

  const handleLogout = async() => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        alert("User Logged Out");
        localStorage.removeItem("user");
        setAuthUser(null);
        navigate("/login");
      } else {
        console.error("Failed to log out.");
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.log("Error while logging out", error);
    }
  }

  return (
    <div className='flex flex-col items-center mt-52'>
        <IoIosLogOut className='text-3xl relative left-1/3 -top-20 cursor-pointer' onClick={handleLogout} />
        <h1 className='mb-8 text-2xl'>Profile Details</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <input 
              type="text"
              className='mb-6 border rounded-lg p-2 px-6'
              placeholder='Enter education'
              value={profile.education}
              onChange={(e) => setProfile({...profile, education: e.target.value})}
            />
            <input 
              type="text"
              className='mb-6 border rounded-lg p-2 px-6'
              placeholder='Enter experience'
              value={profile.experience}
              onChange={(e) => setProfile({...profile, experience: e.target.value})}
            />
            <input 
              type="text"
              className='mb-6 border rounded-lg p-2 px-6'
              placeholder='Enter skills'
              value={profile.skills}
              onChange={(e) => setProfile({...profile, skills: e.target.value})}
            />
            <input 
              type="file"
              className='mb-6 rounded-lg p-2 px-6'
              onChange={handleFileChange}
            />
            <button className='border rounded-md py-2'>Submit</button>
        </form>
    </div>
  )
}

export default Home;