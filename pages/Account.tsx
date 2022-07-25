import React, { useState, useEffect } from 'react'
import { db } from "../authContext";
import { getAuth } from "firebase/auth";
import { doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import SavedShows from '../components/SavedShows';

const Account = () => {
  const [movies, setMovies] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const movieID = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    const fetchDoc = async () => {
      const docSnap = await getDoc(movieID);
      setMovies(docSnap.data()?.savedShows);
      console.log(movies);
    };
    fetchDoc();
  }, [user?.email]);
  

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft + 500;
  };



  return (
    <>
      <div className='w-full text-white'>
        <img
          className='w-full h-[400px] object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
          alt='/'
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  )
}

export default Account